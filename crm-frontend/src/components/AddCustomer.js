import React, { useState } from 'react';
import { addCustomer } from '../api/apiService';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './addcustomer.css';

const AddCustomerForm = () => {
  const [companyId, setCompanyId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [visits, setVisits] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const customerData = {
      companyId,
      name,
      email,
      phoneNumber,
      visits: parseInt(visits),
      purchaseAmount: parseFloat(purchaseAmount),
    };

    try {
      setLoading(true);
      const response = await addCustomer(customerData);
      alert(response.data.message || 'Customer added successfully!');
      setCompanyId('');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setVisits('');
      setPurchaseAmount('');
    } catch (error) {
      console.error('Error adding customer:', error);
      alert('Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="add-customer-form mt-4">
      <Card className="add-customer-card p-4">
        <h4 className="add-customer-title">Add Customer</h4>
        <Form onSubmit={handleAddCustomer}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="companyId">
                <Form.Label className="form-label">Company ID</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  placeholder="Enter Company ID"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="phoneNumber">
                <Form.Label className="form-label">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter Phone Number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="visits">
                <Form.Label className="form-label">Visits</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  min="0"
                  value={visits}
                  onChange={(e) => setVisits(e.target.value)}
                  placeholder="Enter Number of Visits"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="purchaseAmount">
                <Form.Label className="form-label">Purchase Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  className="form-control"
                  min="0"
                  step="0.01"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  placeholder="Enter Purchase Amount"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button
            type="submit"
            disabled={loading}
            className="add-button"
          >
            {loading ? 'Adding...' : 'Add Customer'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddCustomerForm;
