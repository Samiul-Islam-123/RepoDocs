//this file contains functions to generate README


const { GoogleGenerativeAI } = require("@google/generative-ai");
// const dotenv = require('dotenv');
// dotenv.config();
// console.log(process.env.GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI(`AIzaSyBYNYe76pW1-t9SND2y_roFs11gS-yW2Mo`);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Explain how AI works";

const ExecutePrompt =async (prompt, socket) => {
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    socket.emit('generate-response', { 
      status : "pending",
      data : chunkText
    })
    process.stdout.write(chunkText);
  }
}


module.exports = {ExecutePrompt};