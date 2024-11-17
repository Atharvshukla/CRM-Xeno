import React, { useState } from 'react';
import { filterCustomers, sendMessage } from '../api/apiService'; // Adjust the import path
import { Form, Button, Spinner, ListGroup, Card, InputGroup } from 'react-bootstrap';
import './FilterCustomerForm.css';

const FilterCustomerForm = ({ setFilteredCustomers }) => {
  const [companyId, setCompanyId] = useState('');
  const [minVisits, setMinVisits] = useState('');
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');
  const [filteredCustomers, setLocalFilteredCustomers] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  // Fetch filtered customers based on criteria
  const handleFilterCustomers = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await filterCustomers(companyId, minVisits, minPurchaseAmount);
      const customers = response.data;
      setLocalFilteredCustomers(customers);
      setFilteredCustomers(customers);
    } catch (error) {
      console.error('Error filtering customers:', error);
      alert('Failed to filter customers');
    } finally {
      setLoading(false);
    }
  };

  // Send a message to filtered customers
  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      alert('Please enter a message to send.');
      return;
    }

    if (filteredCustomers.length === 0) {
      alert('No customers to send messages to!');
      return;
    }

    try {
      for (const customer of filteredCustomers) {
        await sendMessage(customer._id, messageText, token);
        console.log(`Message sent to customer ID: ${customer._id}`);
      }
      alert('Messages sent successfully to filtered customers!');
      setMessageText('');
    } catch (error) {
      console.error('Error sending messages:', error);
      alert('Failed to send messages.');
    }
  };

  return (
    <Card className="filter-customer-form">
      <Card.Body>
        <h3 className="form-title">Filter Customers</h3>
        <Form onSubmit={handleFilterCustomers} className="filter-form">
          <Form.Group controlId="companyId">
            <Form.Label>Company ID</Form.Label>
            <Form.Control
              type="text"
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              placeholder="Enter Company ID"
              required
            />
          </Form.Group>
          <Form.Group controlId="minVisits">
            <Form.Label>Minimum Visits</Form.Label>
            <Form.Control
              type="number"
              value={minVisits}
              onChange={(e) => setMinVisits(e.target.value)}
              placeholder="Enter Minimum Visits"
              required
            />
          </Form.Group>
          <Form.Group controlId="minPurchaseAmount">
            <Form.Label>Minimum Purchase Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              value={minPurchaseAmount}
              onChange={(e) => setMinPurchaseAmount(e.target.value)}
              placeholder="Enter Minimum Purchase Amount"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="filter-button">
            {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Filter Customers'}
          </Button>
        </Form>

        {filteredCustomers.length > 0 && (
          <div className="filtered-customers-section">
            <h4>Filtered Customers</h4>
            <ListGroup className="customer-list">
              {filteredCustomers.map((customer) => (
                <ListGroup.Item key={customer._id} className="customer-item">
                  <div>
                    <strong>{customer.name}</strong> ({customer.email})
                  </div>
                  <div>Visits: {customer.visits}, Purchase: ₹{customer.purchaseAmount}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <InputGroup className="message-input">
              <Form.Control
                as="textarea"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here..."
                rows="3"
              />
            </InputGroup>
            <Button variant="success" onClick={handleSendMessage} className="send-button">
              Send Message
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default FilterCustomerForm;
