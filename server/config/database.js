// Import mongoose for MongoDB connection
const mongoose = require('mongoose');

// Import dotenv to load environment variables from the .env file
const dotenv = require('dotenv');

// Load environment variables into process.env
dotenv.config();

// Get the MongoDB URI from the environment variables
const dbURI = process.env.MONGO_URI;

/**
 * Function to connect to the MongoDB database
 * Uses mongoose.connect to establish the connection
 */
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI
    await mongoose.connect(dbURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    // Log the error if connection fails
    console.error('❌ MongoDB connection failed:', error);
    
    // Exit the process with failure
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other files
module.exports = connectDB;
