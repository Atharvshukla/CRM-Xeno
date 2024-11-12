const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: String,
    email: String,
    phoneNumber: String,
    visits: Number,
    purchaseAmount: Number,
});

module.exports = mongoose.model('Customer', CustomerSchema);
