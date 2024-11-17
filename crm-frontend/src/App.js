import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CustomerLogin from './components/login_c'; // Assuming this is your customer login component
import CustomerDashboard from './components/CustomerDashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login_C" element={<CustomerLogin />} />  {/* Customer login page */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />  Customer dashboard
      </Routes>
    </Router>
  );
}

export default App;
