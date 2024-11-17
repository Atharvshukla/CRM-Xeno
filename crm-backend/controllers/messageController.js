// controllers/messagesController.js
const Message = require('../models/Message');
const Customer = require('../models/customer');

// Get messages for a customer by email
exports.getMessagesByCustomerEmail = async (req, res) => {
  const { email, companyId } = req.query;

  try {
    // Find the customer based on email and companyId
    const customer = await Customer.findOne({ email, companyId });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found for this company' });
    }

    // Fetch messages for the customer
    const messages = await Message.find({ customerId: customer._id }).sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
