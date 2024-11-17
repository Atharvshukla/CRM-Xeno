import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register and Login
export const registerCompany = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginCompany = (data) => axios.post(`${API_URL}/auth/login`, data);

// Customer Login
export const customerLogin = (data) =>
  axios.post(`${API_URL}/auth/customer/login`, data, {
    headers: { 'Content-Type': 'application/json' },
  });

// Add Customer (companyId in body)
export const addCustomer = (data) =>
  axios.post(`${API_URL}/customers/add-customer`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

// Get All Customers (companyId in body)
export const getCustomers = (companyId) =>
  axios.post(`${API_URL}/customers/get-customers`, { companyId }, {
    headers: { 'Content-Type': 'application/json' },
  });

// Send Message to Customer (companyId in body)
export const sendMessage = (message, customerId,) => {
  // Ensure customerId is a valid ObjectId before making the API call
  // if (!/^[a-f\d]{24}$/i.test(customerId)) {
  //   console.error('Invalid customerId format:', customerId);
  //   return Promise.reject('Invalid customerId format');
  // }

  return axios.post(
    `${API_URL}/messages/send`,
    { message, customerId },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};


// Fetch Message History for a Customer (companyId in body)
export const getMessageHistory = (customerId, companyId) =>
  axios.post(`${API_URL}/messages/history`, { customerId, companyId }, {
    headers: { 'Content-Type': 'application/json' },
  });

// Filter Customers (companyId as query param)
export const filterCustomers = (companyId, minVisits, minPurchaseAmount) =>
  axios.get(`${API_URL}/customers/filter-customers`, {
    params: { companyId, minVisits, minPurchaseAmount },
  });

// Update Customer Details
export const updateCustomer = (customerId, companyId, data) =>
  axios.put(`${API_URL}/customers/update-customer`, { customerId, companyId, ...data }, {
    headers: { 'Content-Type': 'application/json' },
  });

// Delete Customer (companyId in body)
export const deleteCustomer = (customerId, companyId) =>
  axios.post(`${API_URL}/customers/delete-customer`, { customerId, companyId }, {
    headers: { 'Content-Type': 'application/json' },
  });

// Get Customer Visit and Purchase History (companyId in body)
export const getCustomerHistory = (customerId, companyId) =>
  axios.post(`${API_URL}/customers/history`, { customerId, companyId }, {
    headers: { 'Content-Type': 'application/json' },
  });
