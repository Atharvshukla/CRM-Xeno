const redis = require('redis');

// Create Redis publisher and subscriber clients
const redisClient = redis.createClient({
  host: 'localhost',  // Redis host
  port: 6379,         // Redis port (default is 6379)
});

const redisSubscriber = redis.createClient({
  host: 'localhost',
  port: 6379,
});

redisClient.on('connect', () => {
  console.log('Connected to Redis Publisher...');
});

redisSubscriber.on('connect', () => {
  console.log('Connected to Redis Subscriber...');
});

redisClient.on('error', (err) => {
  console.log('Redis Publisher error: ', err);
});

redisSubscriber.on('error', (err) => {
  console.log('Redis Subscriber error: ', err);
});

// Function to publish messages to a specific Redis channel
const publishMessage = (channel, message) => {
  redisClient.publish(channel, message, (err, reply) => {
    if (err) {
      console.log('Error publishing message: ', err);
    } else {
      console.log(`Message published to ${channel}: ${message}`);
    }
  });
};

// Function to subscribe to a Redis channel
const subscribeToChannel = (channel, callback) => {
  redisSubscriber.subscribe(channel, (err, res) => {
    if (err) {
      console.log(`Error subscribing to channel ${channel}: `, err);
    } else {
      console.log(`Subscribed to channel: ${channel}`);
    }
  });

  redisSubscriber.on('message', (channel, message) => {
    console.log(`Received message from ${channel}: ${message}`);
    callback(message);  // Execute callback when message is received
  });
};

module.exports = {
  publishMessage,
  subscribeToChannel,
};
