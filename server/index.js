const express = require('express');
const http = require('http'); // For creating an HTTP server
const { Server } = require('socket.io'); // Importing socket.io
const cors = require('cors');
const dotenv = require('dotenv');
const Logger = require('./utils/Logger');
const ConnectToDatabase = require('./config/dbConfig');

const getIPAddress = require('./utils/IP');
const AuthRouter = require('./routes/AuthRouter');
const jwt = require('jsonwebtoken'); // For handling JWTs
const { ExecutePrompt, ExtractInfo, formatRepoInfo } = require('./utils/Generator');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5500;

// Logger instance
const logger = new Logger();

// Middleware
app.use(express.json());
app.use(cors());

// Load environment variables
dotenv.config();

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Hellow :)',
    success: true,
  });
});

// Custom routes
app.use('/auth', AuthRouter);

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust origin for your front-end domain
    methods: ['GET', 'POST'],
  },
});

// Socket.io middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token; // JWT sent during socket connection
  if (!token) {
    return next(new Error('Authentication error: Token not provided'));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    socket.user = user; // Attach the user data to the socket object
    next(); // Proceed to the next middleware
  } catch (err) {
    next(new Error('Authentication error: Invalid token'));
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  logger.info(`New socket connection: ${socket.id} (User: ${socket.user.username})`);

  // Custom event example
  socket.on('generate-request', async (data) => {
    const dataString = typeof data === 'object' ? JSON.stringify(data) : data.toString();
    logger.info(`Received message from ${socket.user.username}: ${dataString}`);
  
    try {
      const repoInfo = await ExtractInfo(data.repoURL);
      logger.info('Repository metadata:', repoInfo);
  
      // Convert the repo info to a readable string format
      const repoInfoString = formatRepoInfo(repoInfo);
  
      // Prepare the prompt by appending the repo info to the user's prompt
      const fullPrompt = `You are a professional README writer. Write a README.md file for me . I need only the README.md nothing else

      ${dataString}\n\nHere is the project information:\n${repoInfoString}`;
  
      // Execute the prompt with the formatted information
      await ExecutePrompt(fullPrompt, socket);
  
      socket.emit('generate-response', { status: 'completed' });
      
    } catch (error) {
      console.error("Error processing request:", error);
      socket.emit('generate-response', { status: 'failed', error: error.message });
    }
  });
  
  
  

  // Handle disconnect
  socket.on('disconnect', () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(PORT, async () => {
  logger.info('Server is starting...');
  if (process.env.MONGODB_URL) {
    await ConnectToDatabase(process.env.MONGODB_URL);
  } else {
    logger.error('DATABASE URL not found...please recheck environment variables...');
  }

  const SERVERURL = getIPAddress();
  logger.info(`Server is up and running at : http://${SERVERURL}:${PORT}`);
});
