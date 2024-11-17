import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/messages/get-messages', {
        params: { email, companyId },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMessages();
  };

  return (
    <div className="dashboard">
      <h2>Customer Message Dashboard</h2>
      <form onSubmit={handleSearch}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          required
        />
        <button type="submit">Get Messages</button>
      </form>

      {loading && <p>Loading messages...</p>}

      {messages.length > 0 ? (
        <div className="message-list">
          <h3>Messages:</h3>
          <ul>
            {messages.map((msg) => (
              <li key={msg._id}>
                {msg.message} <small>({new Date(msg.createdAt).toLocaleString()})</small>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading && <p>No messages found.</p>
      )}
    </div>
  );
};

export default CustomerDashboard;
