const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost', // Redis host from .env
  port: process.env.REDIS_PORT || 6379,       // Redis port from .env
});

// Handling Redis errors
client.on('error', (err) => {
  console.log('Error connecting to Redis:', err);
});

module.exports = client;
