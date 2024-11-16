import React, { useState } from 'react';
import { filterCustomers } from '../api/apiService';

const FilterCustomerForm = () => {
  const [companyId, setCompanyId] = useState('');
  const [minVisits, setMinVisits] = useState('');
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const handleFilterCustomers = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    try {
      // Make the POST request with the necessary body data
      const response = await filterCustomers(companyId, minVisits, minPurchaseAmount);
      
      // Handle successful API response
      setFilteredCustomers(response.data);
    } catch (error) {
      console.error('Error filtering customers:', error);
      
      // Error handling if API request fails
      alert('Failed to filter customers');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <form onSubmit={handleFilterCustomers}>
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
        <button type="submit" disabled={loading}>Filter Customers</button>
      </form>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display filtered customers */}
      {filteredCustomers.length > 0 && (
        <div>
          <h3>Filtered Customers</h3>
          <ul>
            {filteredCustomers.map((customer) => (
              <li key={customer._id}>
                Name: {customer.name}, Email: {customer.email}, Visits: {customer.visits}, Purchase Amount: ₹{customer.purchaseAmount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterCustomerForm;
