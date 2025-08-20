// MongoDB Connection with Retry Logic
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbURI = process.env.MONGO_URI;
const RETRY_INTERVAL = 5000; // Retry every 5 seconds

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log(`🔄 Retrying in ${RETRY_INTERVAL / 1000} seconds...`);

    // Retry after interval
    setTimeout(connectDB, RETRY_INTERVAL);
  }
};

module.exports = connectDB;
