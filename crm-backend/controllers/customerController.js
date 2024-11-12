const Customer = require('../models/customerModel');

exports.addCustomer = async (req, res) => {
    const { name, email, phoneNumber, visits, purchaseAmount } = req.body;
    const customer = new Customer({ companyId: req.company.id, name, email, phoneNumber, visits, purchaseAmount });
    await customer.save();
    res.json(customer);
};

exports.getCustomers = async (req, res) => {
    const customers = await Customer.find({ companyId: req.company.id });
    res.json(customers);
};
