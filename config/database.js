const mongoose = require('mongoose');
require('dotenv').config();

/**
 * MongoDB Connection Configuration
 * 
 * Environment Variables:
 * - MONGODB_USERNAME: MongoDB username (default: himanshubarnwal1126)
 * - MONGODB_PASSWORD: MongoDB password (default: Hkb@8570890789)
 * - MONGODB_CLUSTER: MongoDB cluster URL (default: cluster0.q0dysfk.mongodb.net)
 * - MONGODB_DATABASE: Database name (default: property_database)
 */

const username = process.env.MONGODB_USERNAME || 'himanshubarnwal1126';
const password = process.env.MONGODB_PASSWORD || 'Hkb@8570890789';
const cluster_url = process.env.MONGODB_CLUSTER || 'cluster0.q0dysfk.mongodb.net';
const database_name = process.env.MONGODB_DATABASE || 'property_database';

// Construct MongoDB URI
const MONGODB_URI = `mongodb+srv://${username}:${encodeURIComponent(password)}@${cluster_url}/${database_name}?retryWrites=true&w=majority`;

/**
 * Connect to MongoDB
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
    console.log(`📦 Database: ${database_name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Connection event listeners
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from MongoDB');
});

// Handle application termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🛑 MongoDB connection closed due to application termination');
  process.exit(0);
});

module.exports = connectDB;
