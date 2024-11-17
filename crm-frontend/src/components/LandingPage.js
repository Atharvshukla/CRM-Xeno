import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">Xeno-CRM</Link>
          <ul className="navbar-links">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/login_C">Customer Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* Landing Section with Image and Options */}
      <section className="landing">
        <div className="landing-content">
          <h1>Welcome to Xeno-CRM</h1>
          <p>Your ultimate solution for customer relationship management</p>
          <div className="landing-buttons">
            <Link to="/register" className="button-register">Register as Company</Link>
            <Link to="/login" className="button-login">Login</Link>
            <Link to="/login_C" className="button-customer-login">Customer Login</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Xeno-CRM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
