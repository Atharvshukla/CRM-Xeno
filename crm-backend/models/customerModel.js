const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    visits: { type: Number, default: 0 },
    purchaseAmount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
