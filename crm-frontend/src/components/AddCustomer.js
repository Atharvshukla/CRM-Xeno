import React, { useState } from 'react';
import { addCustomer } from '../api/apiService';

const AddCustomer = ({ onCustomerAdded }) => {
  const [customer, setCustomer] = useState({ name: '', email: '', phoneNumber: '', visits: '', purchaseAmount: '' });
  const token = localStorage.getItem('token');

  const handleAdd = async (e) => {
    e.preventDefault();
    await addCustomer(customer, token);
    onCustomerAdded();
  };

  return (
    <form onSubmit={handleAdd}>
      <input type="text" placeholder="Name" onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required />
      <input type="email" placeholder="Email" onChange={(e) => setCustomer({ ...customer, email: e.target.value })} required />
      <input type="text" placeholder="Phone Number" onChange={(e) => setCustomer({ ...customer, phoneNumber: e.target.value })} required />
      <input type="number" placeholder="Visits" onChange={(e) => setCustomer({ ...customer, visits: e.target.value })} required />
      <input type="number" placeholder="Purchase Amount" onChange={(e) => setCustomer({ ...customer, purchaseAmount: e.target.value })} required />
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default AddCustomer;
