import React, { useEffect, useState } from 'react';
import { getCustomers, sendMessage } from '../api/apiService';
import AddCustomer from './AddCustomer';
import CustomerTable from './customerTable';
import FilterCustomers from './FilterCustomers';
import './Dashboard.css';

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
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-section">
        <h3 className="section-title">Add Customer</h3>
        <AddCustomer onCustomerAdded={fetchCustomers} />
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Filter Customers</h3>
        <FilterCustomers customers={customers} onFilter={handleFilterResults} />
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Customer List</h3>
        <CustomerTable customers={filteredCustomers} />
      </div>

      <button className="send-message-button" onClick={handleSendMessage}>
        Send Message to All Filtered Customers
      </button>
    </div>
  );
};

export default Dashboard;
