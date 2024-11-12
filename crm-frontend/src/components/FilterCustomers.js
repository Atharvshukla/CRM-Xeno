import React, { useState } from 'react';

const FilterCustomers = ({ customers, onFilter }) => {
  const [minVisits, setMinVisits] = useState('');
  const [maxVisits, setMaxVisits] = useState('');
  const [minPurchase, setMinPurchase] = useState('');
  const [maxPurchase, setMaxPurchase] = useState('');

  // Function to handle the filtering
  const handleFilter = () => {
    const filteredCustomers = customers.filter((customer) => {
      const meetsVisitCriteria = 
        (!minVisits || customer.visits >= minVisits) && 
        (!maxVisits || customer.visits <= maxVisits);
      
      const meetsPurchaseCriteria = 
        (!minPurchase || customer.purchaseAmount >= minPurchase) && 
        (!maxPurchase || customer.purchaseAmount <= maxPurchase);

      return meetsVisitCriteria && meetsPurchaseCriteria;
    });
    
    // Pass the filtered results back to the parent component
    onFilter(filteredCustomers);
  };

  return (
    <div>
      <h3>Filter Customers</h3>
      <div>
        <label>Min Visits:</label>
        <input
          type="number"
          value={minVisits}
          onChange={(e) => setMinVisits(e.target.value)}
          placeholder="Enter minimum visits"
        />
      </div>
      <div>
        <label>Max Visits:</label>
        <input
          type="number"
          value={maxVisits}
          onChange={(e) => setMaxVisits(e.target.value)}
          placeholder="Enter maximum visits"
        />
      </div>
      <div>
        <label>Min Purchase Amount:</label>
        <input
          type="number"
          value={minPurchase}
          onChange={(e) => setMinPurchase(e.target.value)}
          placeholder="Enter minimum purchase amount"
        />
      </div>
      <div>
        <label>Max Purchase Amount:</label>
        <input
          type="number"
          value={maxPurchase}
          onChange={(e) => setMaxPurchase(e.target.value)}
          placeholder="Enter maximum purchase amount"
        />
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default FilterCustomers;
