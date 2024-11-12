const Company = require('../models/companyModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { companyName, email, password } = req.body;
    const company = new Company({ companyName, email, password });
    await company.save();
    res.status(201).json({ message: 'Company registered successfully' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company || !(await bcrypt.compare(password, company.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET);
    res.json({ token });
};
