// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const RedisClient = require('./utils/redisClient'); // Redis client utility
const customerRoutes = require('./routes/customerRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/messages', messageRoutes);

// MongoDB Connection Function
const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Redis Client Initialization
RedisClient.on('connect', () => {
  console.log('✅ Redis connected');
});

RedisClient.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

// Redis Pub/Sub - Listen to customer messages
RedisClient.subscribe('customerMessages');
RedisClient.on('message', (channel, message) => {
  console.log(`📩 Received message on channel [${channel}]:`, message);
  // Handle the message received from Redis (e.g., send notifications to users)
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server after DB connection
const startServer = async () => {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
