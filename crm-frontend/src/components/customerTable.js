import React from 'react';

const CustomerTable = ({ customers }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Visits</th>
        <th>Purchase Amount</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer) => (
        <tr key={customer._id}>
          <td>{customer.name}</td>
          <td>{customer.email}</td>
          <td>{customer.phoneNumber}</td>
          <td>{customer.visits}</td>
          <td>{customer.purchaseAmount}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CustomerTable;
