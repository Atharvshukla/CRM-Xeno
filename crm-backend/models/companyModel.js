const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const CompanySchema = new mongoose.Schema({
    companyName: String,
    email: String,
    password: String,
});

CompanySchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('Company', CompanySchema);
