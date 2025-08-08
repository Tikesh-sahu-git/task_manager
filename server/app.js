// ==========================
// Import Dependencies
// ==========================
const express = require('express'); // Web framework for building APIs
const mongoose = require('mongoose'); // MongoDB object modeling tool
const dotenv = require('dotenv'); // Environment variable manager
const connectDB = require('./config/database'); // Custom MongoDB connection function
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies

// Import routes
const userRouter = require('./routes/user.router'); // For user-related operations
const taskRouter = require('./routes/task.router'); // For task-related operations

// ==========================
// Load Environment Variables
// ==========================
dotenv.config(); // Load variables from .env into process.env

// ==========================
// Connect to Database
// ==========================
connectDB(); // Establish MongoDB connection

// ==========================
// Initialize Express App
// ==========================
const app = express();
const PORT = process.env.PORT || 8000;

// ==========================
// Middleware Setup
// ==========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==========================
// Route Handling
// ==========================
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

// ==========================
// Start the Server
// ==========================
app.listen(PORT, () => {
  console.log(`✅ Server is running on port http://localhost:${PORT}`);
});
