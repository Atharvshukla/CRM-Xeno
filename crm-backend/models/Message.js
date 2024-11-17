// models/message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer', // Reference to the customer collection
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['SENT', 'FAILED'],
      default: 'SENT',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
