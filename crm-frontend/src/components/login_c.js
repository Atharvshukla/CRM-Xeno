import React, { useState } from 'react';
import { customerLogin } from '../api/apiService';  // Make sure to import the correct API method
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const CustomerLogin = () => {
  const [formData, setFormData] = useState({ email: '', companyId: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make the API request with email and companyId only
      const { data } = await customerLogin(formData);
      localStorage.setItem('token', data.token);  // Store the token in localStorage
      navigate('/customer-dashboard');  // Redirect to the customer dashboard or any other page
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Company ID"
          value={formData.companyId}
          onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <button className="register-button" onClick={() => navigate('/register')}>
        Go to Register
      </button>
    </div>
  );
};

export default CustomerLogin;
