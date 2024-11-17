const Customer = require('../models/customerModel');
const jwt = require('jsonwebtoken');

exports.customerLogin = async (req, res) => {
    const { email, companyId } = req.body;

    try {
        // Find customer by email and companyId
        const customer = await Customer.findOne({ email, companyId });

        // Check if customer exists
        if (!customer) {
            return res.status(400).json({ message: 'Customer not found or invalid credentials' });
        }

        // Validate that the email matches the email (since email is treated as the password)
        if (email !== customer.email) {
            return res.status(400).json({ message: 'Invalid email/password combination' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { customerId: customer._id, companyId: customer.companyId, email: customer.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time (optional)
        );

        // Respond with the token
        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during login' });
    }
};
