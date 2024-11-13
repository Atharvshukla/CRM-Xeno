import React, { useState } from 'react';
import { registerCompany } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerCompany(formData);
      alert('Registration Successful!');
      navigate('/login');
    } catch (err) {
      alert('Error during registration');
    }
  };

  return (
    <div className="register-container">
      <h2>Register Company</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className="register-button">Register</button>
      </form>
      <button className="login-button" onClick={() => navigate('/login')}>
        Go to Login
      </button>
    </div>
  );
};

export default Register;
