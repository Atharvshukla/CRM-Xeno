import React, { useState } from 'react';
import { filterCustomers, sendMessage } from '../api/apiService'; // Adjust the import path

const FilterCustomerForm = ({ setFilteredCustomers }) => {
  const [companyId, setCompanyId] = useState('');
  const [minVisits, setMinVisits] = useState('');
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');
  const [filteredCustomers, setLocalFilteredCustomers] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  // Fetch filtered customers based on criteria
  const handleFilterCustomers = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await filterCustomers(companyId, minVisits, minPurchaseAmount);

      // Handle the response and update state
      const customers = response.data; // Assuming response.data is the customer list
      setLocalFilteredCustomers(customers);
      setFilteredCustomers(customers); // Update parent state if provided
    } catch (error) {
      console.error('Error filtering customers:', error);
      alert('Failed to filter customers');
    } finally {
      setLoading(false);
    }
  };

  // Send a message to filtered customers
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
    <div>
      <form onSubmit={handleFilterCustomers}>
        <h3>Filter Customers</h3>
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
          <label>Minimum Visits:</label>
          <input
            type="number"
            value={minVisits}
            onChange={(e) => setMinVisits(e.target.value)}
            placeholder="Enter Minimum Visits"
            required
          />
        </div>
        <div>
          <label>Minimum Purchase Amount:</label>
          <input
            type="number"
            value={minPurchaseAmount}
            onChange={(e) => setMinPurchaseAmount(e.target.value)}
            placeholder="Enter Minimum Purchase Amount"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Filtering...' : 'Filter Customers'}
        </button>
      </form>

      {/* Show filtered customers */}
      {filteredCustomers.length > 0 && (
        <div>
          <h3>Filtered Customers</h3>
          <ul>
            {filteredCustomers.map((customer) => (
              <li key={customer._id}>
                {customer.name}, {customer.email}, Visits: {customer.visits}, Purchase: ₹{customer.purchaseAmount}
              </li>
            ))}
          </ul>

          {/* Custom message input and send button */}
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message here..."
            rows="4"
          />
          <button onClick={handleSendMessage}>Send Message to Filtered Customers</button>
        </div>
      )}
    </div>
  );
};

export default FilterCustomerForm;
