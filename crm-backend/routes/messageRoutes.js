const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Customer = require('../models/customerModel');

// Send message to a specific customer
router.post('/send', async (req, res) => {
  const { customerId, message } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const newMessage = await Message.create({
      customerId,
      message,
      status: 'SENT',
    });

    res.json({ success: true, message: 'Message sent', data: newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
