const express = require('express');
const Customer = require('../models/customerModel');
const router = express.Router();

// Route to add a new customer
router.post('/add-customer', (req, res) => {
  const { companyId, name, email, phoneNumber, visits, purchaseAmount } = req.body;

  // Validate the input data
  if (!companyId || !name || !email || !phoneNumber || visits === undefined || purchaseAmount === undefined) {
    return res.status(400).json({ error: 'All fields including companyId are required' });
  }

  // Create a new customer document
  const newCustomer = new Customer({
    companyId,
    name,
    email,
    phoneNumber,
    visits: parseInt(visits),
    purchaseAmount: parseFloat(purchaseAmount)
  });

  // Save to the database
  newCustomer.save()
    .then(() => res.status(201).json({ message: 'Customer added successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Error adding customer!', details: err }));
});

// Route to get all customers for a specific company
router.get('/get-customers', (req, res) => {
  const { companyId } = req.query;
  
  if (!companyId) {
    return res.status(400).json({ error: 'companyId is required as a query parameter' });
  }

  Customer.find({ companyId })
    .then(customers => res.status(200).json(customers))
    .catch(err => res.status(400).json({ error: 'Error fetching customers', details: err }));
});

// Route to filter customers by visits and purchase amount for a company
router.get('/filter-customers', async (req, res) => {
  const { companyId, minVisits, minPurchaseAmount } = req.query;

  // Validate the input data
  if (!companyId || !minVisits || !minPurchaseAmount) {
    return res.status(400).json({ error: 'companyId, minVisits, and minPurchaseAmount are required query parameters' });
  }

  try {
    // Filter customers based on visits (<= minVisits) and purchase amount (<= minPurchaseAmount)
    const filteredCustomers = await Customer.find({
      companyId: companyId,
      visits: { $lte: parseInt(minVisits) }, // Fetch customers with visits <= minVisits
      purchaseAmount: { $lte: parseFloat(minPurchaseAmount) }, // Fetch customers with purchaseAmount <= minPurchaseAmount
    });

    res.status(200).json(filteredCustomers);
  } catch (err) {
    res.status(400).json({ error: 'Error filtering customers', details: err });
  }
});


// Route to update a customer
router.put('/update-customer/:id', (req, res) => {
  const { id } = req.params;
  const { visits, purchaseAmount } = req.body;

  Customer.findByIdAndUpdate(id, { 
      visits: parseInt(visits), 
      purchaseAmount: parseFloat(purchaseAmount) 
    }, { new: true })
    .then(updatedCustomer => {
      if (!updatedCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer updated successfully', updatedCustomer });
    })
    .catch(err => res.status(400).json({ error: 'Error updating customer', details: err }));
});

// Route to delete a customer
router.delete('/delete-customer/:id', (req, res) => {
  const { id } = req.params;

  Customer.findByIdAndDelete(id)
    .then(deletedCustomer => {
      if (!deletedCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer deleted successfully' });
    })
    .catch(err => res.status(400).json({ error: 'Error deleting customer', details: err }));
});

module.exports = router;
