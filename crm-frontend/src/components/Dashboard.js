import React, { useEffect, useState } from 'react';
import { getCustomers, sendMessage } from '../api/apiService';
import AddCustomer from './AddCustomer';
import CustomerTable from './customerTable';
import FilterCustomers from './FilterCustomers';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data } = await getCustomers(token);
    setCustomers(data);
    setFilteredCustomers(data);
  };

  const handleFilterResults = (results) => {
    setFilteredCustomers(results);
  };

  const handleSendMessage = async () => {
    const message = "Hi, this is a personalized message!";
    await sendMessage(message, token);
    alert("Message sent successfully!");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <AddCustomer onCustomerAdded={fetchCustomers} />
      <FilterCustomers customers={customers} onFilter={handleFilterResults} />
      <CustomerTable customers={filteredCustomers} />
      <button onClick={handleSendMessage}>Send Message to All Filtered Customers</button>
    </div>
  );
};

export default Dashboard;
