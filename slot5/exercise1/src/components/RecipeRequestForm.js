import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default function RecipeRequestForm({ show, onHide }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ingredient: '',
    prepTime: '',
    notes: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onHide();
      setFormData({
        name: '',
        email: '',
        ingredient: '',
        prepTime: '',
        notes: ''
      });
    }, 2000);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>📝 Recipe Request Form</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {showSuccess && (
          <Alert variant="success" className="mb-3">
            🎉 Your recipe request has been submitted successfully!
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Desired Ingredient *</Form.Label>
            <Form.Control
              type="text"
              name="ingredient"
              placeholder="e.g., Quinoa, Sweet Potato, Avocado, Chickpeas, etc."
              value={formData.ingredient}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please specify your desired ingredient
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Prep Time *</Form.Label>
            <Form.Select
              name="prepTime"
              value={formData.prepTime}
              onChange={handleInputChange}
              required
            >
              <option value="">Select prep time</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a prep time
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              rows={4}
              placeholder="Any additional notes, dietary restrictions, or preferences..."
              value={formData.notes}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide any additional notes
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              📤 Submit Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
