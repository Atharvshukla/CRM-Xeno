import React, { useState } from 'react';
import { registerCompany } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ companyName: '', email: '', password: '' });
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
    <div>
      <h2>Register Company</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Company Name" onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
