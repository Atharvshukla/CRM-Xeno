import React, { useEffect, useState } from 'react';
import { getCustomers, sendMessage } from '../api/apiService';
import AddCustomer from './AddCustomer';
import CustomerTable from './customerTable';
import FilterCustomers from './FilterCustomers';
import './Dashboard.css';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [messageText, setMessageText] = useState(''); // State to hold the custom message
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      const { data } = await getCustomers(token);
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  // Update filtered results
  const handleFilterResults = (results) => {
    setFilteredCustomers(results);
  };

  // Handle input change for custom message
  const handleMessageChange = (event) => {
    setMessageText(event.target.value);
  };

  // Send custom message to filtered customers based on their IDs
  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      alert('Please enter a message to send.');
      return;
    }

    if (filteredCustomers.length === 0) {
      alert('No customers to send messages to!');
      return;
    }

    try {
      for (const customer of filteredCustomers) {
        await sendMessage(customer._id, messageText, token);
        console.log(`Message sent to customer ID: ${customer._id}`);
      }
      alert('Messages sent successfully to filtered customers!');
      setMessageText(''); // Clear the message input box
    } catch (error) {
      console.error('Error sending messages:', error);
      alert('Failed to send messages.');
    }
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
        <FilterCustomers
          customers={customers}
          setFilteredCustomers={setFilteredCustomers}
        />
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Customer List</h3>
        <CustomerTable customers={filteredCustomers} />
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">Send Message</h3>
        <textarea
          className="message-textarea"
          value={messageText}
          onChange={handleMessageChange}
          placeholder="Type your message here..."
          rows="4"
        />
        <button className="send-message-button" onClick={handleSendMessage}>
          Send Message to Filtered Customers
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
