import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerCompany = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginCompany = (data) => axios.post(`${API_URL}/auth/login`, data);

export const addCustomer = (data, token) =>
  axios.post(`${API_URL}/customers/add-customer`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getCustomers = (token) =>
  axios.get(`${API_URL}/customers/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const sendMessage = (message, token) =>
  axios.post(`${API_URL}/messages/send`, { message }, {
    headers: { Authorization: `Bearer ${token}` },
  });
