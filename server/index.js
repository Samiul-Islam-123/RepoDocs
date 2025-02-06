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
const UserModel = require('./models/UserModel');
const { console } = require('inspector');
const HistoryModel = require('./models/HistoryModel');
const HistoryRouter = require('./routes/HistoryRouter');

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
app.use('/history', HistoryRouter)

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
io.on('connection',async (socket) => {
  logger.info(`New socket connection: ${socket.id} (User: ${socket.user.username})`);

  //generate event
  socket.on('generate-request', async (data) => {
    const startTime = Date.now(); // Capture start time
    console.log('genersting reuqest.......')
    try {
        // Deduct bolt
        let UserData = await UserModel.findOne({ _id: socket.user.id });
        if(UserData.bolts ===0){
          socket.emit('generate-response', { status: false,
            message : "You dont have enought bolts",
            code : 1
           })
           console.log("Hobe na bhai....")
           return ;
        }
        socket.emit('bolts-left', UserData?.bolts);

        console.log(UserData);
        if (UserData) {
            UserData.bolts -= process.env.BOLT_CHARGE;
            await UserData.save();
            logger.info("Bolts deducted");
        } else {
            return socket.emit('generate-response', {
                success: false,
                message: "User not found",
            });
        }

        const dataString = typeof data === 'object' ? JSON.stringify(data) : data.toString();
        logger.info(`Received message from ${socket.user.username}: ${dataString}`);

        const repoInfo = await ExtractInfo(data.repoURL);
        logger.info('Repository metadata:', repoInfo);

        // Convert repo info to a readable string format
        const repoInfoString = formatRepoInfo(repoInfo);

        // Prepare the prompt
        const fullPrompt = `You are a professional README writer. Write a README.md file for me. I need only the README.md, nothing else.
        Make the README modern with meaningful emojis, badges, and make it informative. Also, include bash commands if required.
        ${dataString}\n\nHere is the project information:\n${repoInfoString}`;

        // Execute the prompt
        await ExecutePrompt(fullPrompt, socket);

        
        // Fetch updated bolts count
        UserData = await UserModel.findOne({ _id: socket.user.id });
        
        // Log history data in required structure
        const historyData = {
          customer: socket.user.id,
          repoURL: data.repoURL,
          configuration: JSON.stringify(data), // Store configuration as JSON string
          timeTaken: Date.now() - startTime, // Calculate execution time
          boltsCharged: process.env.BOLT_CHARGE,
          timestamp: new Date(),
        };
        
        const HistoryRecord = new HistoryModel(historyData);
        await HistoryRecord.save();
        // Emit response
        socket.emit('generate-response', { status: 'completed', historyID : HistoryRecord._id });
        socket.emit('bolts-left', UserData?.bolts);

    } catch (error) {
        console.error("Error processing request:", error);
        socket.emit('generate-response', { status: 'failed', error: error.message });
    } finally {
        // Capture end time and log the execution time
        const endTime = Date.now();
        console.log(`Execution time: ${endTime - startTime} ms`);
    }
});


socket.on('save-content',async data=>{
  const Record = await HistoryModel.findById(data.historyID);
  Record.content = data.content;

  await Record.save();
  logger.info("Record saved");
})


  socket.on('get-bolts', async() => {
    const UserData = await UserModel.findOne({ _id: socket.user.id });
    console.log(UserData.bolts)
      socket.emit('bolts-left', UserData.bolts);
  })



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
