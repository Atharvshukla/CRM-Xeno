const Message = require('../models/Message'); // Assuming you have a Message model for storing messages
const RedisClient = require('./redisClient'); // Redis client for Pub/Sub

// Function to save a message to the database
const saveMessage = async (messageData) => {
  try {
    const newMessage = new Message({
      customerId: messageData.customerId,
      message: messageData.message,
      status: 'SENT', // Default status, you can change it later
    });

    // Save the message to the database
    await newMessage.save();
    console.log('Message saved to database:', newMessage);
    return newMessage;
  } catch (err) {
    console.error('Error saving message:', err);
    throw new Error('Error saving message');
  }
};

// Function to publish a message to Redis Pub/Sub
const publishMessage = (messageData) => {
  try {
    // Publish the message to the Redis channel
    RedisClient.publish('customerMessages', JSON.stringify(messageData));
    console.log('Message published to Redis:', messageData);
  } catch (err) {
    console.error('Error publishing message to Redis:', err);
    throw new Error('Error publishing message');
  }
};

// Function to send a message (combines both saving and publishing)
const sendMessage = async (messageData) => {
  try {
    const savedMessage = await saveMessage(messageData); // Save the message to DB
    publishMessage(messageData); // Publish the message to Redis

    return savedMessage;
  } catch (err) {
    console.error('Error in sendMessage:', err);
    throw new Error('Error sending message');
  }
};

module.exports = {
  sendMessage,
};
