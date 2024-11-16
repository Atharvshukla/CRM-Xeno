const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const customerRoutes = require('./routes/customerRoutes');
const messageRoutes = require('./routes/messageRoutes'); // Ensure messageRoutes is created
const authRoutes = require('./routes/authRoutes'); // Assuming you have routes for authentication
const RedisClient = require('./utils/redisClient'); // Redis connection
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (login, registration)
app.use('/api/customers', customerRoutes); // Customer management routes
app.use('/api/messages', messageRoutes); // Message sending routes

// MongoDB connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      // useNewUrlParser: true, 
      // useUnifiedTopology: true 
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if DB connection fails
  }
};

connectDb();

// Set up Redis client for pub/sub (optional, used for messaging)
RedisClient.on('connect', () => {
  console.log('Redis connected');
});

// Redis Pub/Sub Example - Subscribe to customer messages
RedisClient.subscribe('customerMessages', (message) => {
  console.log('Received message:', message);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

