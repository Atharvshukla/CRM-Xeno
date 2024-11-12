const express = require('express');
const Customer = require('../models/customerModel');  // Ensure this path is correct for your Customer model
const router = express.Router();

// Route to add a new customer
router.post('/add-customer', (req, res) => {
  const { name, email, phone, visits, amount } = req.body;

  // Validate the input data
  if (!name || !email || !phone || !visits || !amount) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Create a new customer document
  const newCustomer = new Customer({
    name,
    email,
    phone,
    visits,
    amount
  });

  // Save to database
  newCustomer.save()
    .then(() => res.status(201).json({ message: 'Customer added successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Error adding customer!', details: err }));
});

// Route to get all customers
router.get('/get-customers', (req, res) => {
  Customer.find()
    .then(customers => res.status(200).json(customers))
    .catch(err => res.status(400).json({ error: 'Error fetching customers', details: err }));
});

// Route to filter customers by number of visits and purchase amount
router.get('/filter-customers', (req, res) => {
  const { minVisits, minAmount } = req.query;

  if (!minVisits || !minAmount) {
    return res.status(400).json({ error: 'minVisits and minAmount are required query parameters' });
  }

  // Query customers with visits >= minVisits and amount >= minAmount
  Customer.find({
    visits: { $gte: parseInt(minVisits) },
    amount: { $gte: parseFloat(minAmount) }
  })
    .then(customers => res.status(200).json(customers))
    .catch(err => res.status(400).json({ error: 'Error filtering customers', details: err }));
});

// Example: Update customer details (e.g., amount and visits)
router.put('/update-customer/:id', (req, res) => {
  const { id } = req.params;
  const { visits, amount } = req.body;

  if (!visits || !amount) {
    return res.status(400).json({ error: 'Visits and amount are required to update' });
  }

  // Find customer by ID and update visits and amount
  Customer.findByIdAndUpdate(id, { visits, amount }, { new: true })
    .then(updatedCustomer => {
      if (!updatedCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer updated successfully', updatedCustomer });
    })
    .catch((err) => res.status(400).json({ error: 'Error updating customer', details: err }));
});

// Example: Delete customer by ID
router.delete('/delete-customer/:id', (req, res) => {
  const { id } = req.params;

  // Find and delete customer by ID
  Customer.findByIdAndDelete(id)
    .then(deletedCustomer => {
      if (!deletedCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer deleted successfully', deletedCustomer });
    })
    .catch((err) => res.status(400).json({ error: 'Error deleting customer', details: err }));
});

module.exports = router;
