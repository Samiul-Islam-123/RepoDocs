const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
const fs = require('fs').promises; // Use promises-based fs
const path = require('path');
const simpleGit = require('simple-git');
const Logger = require("./Logger");

dotenv.config();
// console.log(process.env.GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "Explain how AI works";

const ExtractInfo = async (repoUrl) => {
  const repoName = repoUrl.split('/').pop().replace('.git', '');
  const tempDir = path.join(__dirname, 'repos', repoName);

  try {
    // Clone the repository (returns a promise)
    await simpleGit().clone(repoUrl, tempDir);

    let metadata = { dependencies: {}, scripts: {}, structure: [] };

    // Read package.json (if exists)
    const packageJsonPath = path.join(tempDir, 'package.json');
    try {
      const packageJsonStat = await fs.stat(packageJsonPath);
      if (packageJsonStat) {
        const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
        metadata.dependencies = packageJson.dependencies || {};
        metadata.scripts = packageJson.scripts || {};
      }
    } catch (e) {
      console.log('package.json not found');
    }

    // Read requirements.txt (if exists)
    const requirementsPath = path.join(tempDir, 'requirements.txt');
    try {
      const requirementsStat = await fs.stat(requirementsPath);
      if (requirementsStat) {
        metadata.dependencies.python = (await fs.readFile(requirementsPath, 'utf-8'))
          .split('\n')
          .filter(Boolean);
      }
    } catch (e) {
      console.log('requirements.txt not found');
    }

    // Get project structure recursively
    const getStructure = async (dir, base = '') => {
      const files = await fs.readdir(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const relativePath = path.join(base, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          metadata.structure.push(relativePath + '/');
          await getStructure(fullPath, relativePath); // Recursively call for directories
        } else {
          metadata.structure.push(relativePath);
        }
      }
    };

    await getStructure(tempDir); // Start gathering project structure

    //delete the repo folder
    await fs.rm(path.join(__dirname, 'repos', repoName), { recursive: true, force: true });

    return metadata; // Return the gathered metadata
  } catch (error) {
    console.error("Error extracting repo info:", error);
    throw error; // Rethrow the error after logging
  }
};

// Function to format the repo information into a string
const formatRepoInfo = (repoInfo) => {
  let formattedInfo = '';

  // Format dependencies
  if (repoInfo.dependencies) {
    formattedInfo += `Dependencies:\n`;
    for (const [key, value] of Object.entries(repoInfo.dependencies)) {
      formattedInfo += `  - ${key}: ${value}\n`;
    }
  }

  // Format scripts
  if (repoInfo.scripts) {
    formattedInfo += `Scripts:\n`;
    for (const [key, value] of Object.entries(repoInfo.scripts)) {
      formattedInfo += `  - ${key}: ${value}\n`;
    }
  }

  // Format project structure
  if (repoInfo.structure && repoInfo.structure.length > 0) {
    formattedInfo += `Project Structure:\n`;
    repoInfo.structure.forEach(item => {
      formattedInfo += `  - ${item}\n`;
    });
  }

  return formattedInfo;
};

const ExecutePrompt = async (prompt, socket) => {
  //console.log(prompt)
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    socket.emit('generate-response', {
      status: "pending",
      data: chunkText
    })
    //process.stdout.write(chunkText);
  }
}

module.exports = { ExecutePrompt, ExtractInfo, formatRepoInfo };
