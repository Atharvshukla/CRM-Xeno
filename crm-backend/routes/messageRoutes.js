const express = require('express');
const router = express.Router();
const Customer = require('../models/customerModel'); // Assuming you have a customer model
const RedisClient = require('../utils/redisClient'); // Assuming you use Redis for pub/sub
const { sendMessage } = require('../utils/messageService'); // Assuming you have a message service for sending messages

// Route to send a message to customers based on filter
router.post('/send-message', (req, res) => {
  const { message, minVisits, minAmount } = req.body;

  if (!message || !minVisits || !minAmount) {
    return res.status(400).json({ error: 'Message, minVisits, and minAmount are required' });
  }

  // Fetch customers based on filter criteria
  Customer.find({ 
    visits: { $gte: minVisits }, 
    amount: { $gte: minAmount } 
  })
    .then(customers => {
      if (customers.length === 0) {
        return res.status(404).json({ error: 'No customers match the criteria' });
      }

      // Send the message to each customer (this could be via Redis pub/sub or any messaging system)
      customers.forEach(customer => {
        // Example: publish a message to a Redis channel
        RedisClient.publish('customerMessages', JSON.stringify({
          customerId: customer._id,
          message,
        }));

        // Or you can send the message directly (using any service like Twilio, etc.)
        sendMessage(customer.phone, message);
      });

      res.status(200).json({ message: 'Messages sent successfully to customers!' });
    })
    .catch(err => res.status(500).json({ error: 'Error sending messages', details: err }));
});

module.exports = router;
