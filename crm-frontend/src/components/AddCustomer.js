import React, { useState } from 'react';
import { addCustomer } from '../api/apiService';

const AddCustomerForm = () => {
  const [companyId, setCompanyId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visits, setVisits] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const customerData = {
      companyId,
      name,
      email,
      phoneNumber,
      visits: parseInt(visits),
      purchaseAmount: parseFloat(purchaseAmount),
    };

    try {
      const response = await addCustomer(customerData);
      alert(response.data.message || 'Customer added successfully!');
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer');
    }
  };

  return (
    <form onSubmit={handleAddCustomer}>
      <div>
        <label>Company ID:</label>
        <input
          type="text"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="Enter Company ID"
          required
        />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Customer Name"
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Customer Email"
          required
        />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter Phone Number"
          required
        />
      </div>
      <div>
        <label>Visits:</label>
        <input
          type="number"
          value={visits}
          onChange={(e) => setVisits(e.target.value)}
          placeholder="Number of Visits"
          required
        />
      </div>
      <div>
        <label>Purchase Amount:</label>
        <input
          type="number"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(e.target.value)}
          placeholder="Total Purchase Amount"
          required
        />
      </div>
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AddCustomerForm;
