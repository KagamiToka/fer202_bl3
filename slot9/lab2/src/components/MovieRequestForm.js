import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useForm } from '../hooks/useForm';

const MovieRequestForm = ({ onSubmit, genres }) => {
  const initialFields = {
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: ''
  };

  const validationRules = {
    title: {
      required: 'Title is required'
    },
    genre: {
      required: 'Genre is required'
    },
    year: {
      required: 'Year is required',
      min: 'Year must be 1900 or later'
    },
    duration: {
      required: 'Duration is required',
      min: 'Duration must be greater than 0'
    },
    description: {
      required: 'Description is required',
      minLength: 'Description must be at least 30 characters long'
    }
  };

  const {
    fields,
    errors,
    showSuccess,
    hasErrors,
    handleInputChange,
    validateForm,
    resetForm,
    setSuccess,
    clearSuccess
  } = useForm(initialFields, validationRules);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(fields);
      setSuccess();
      resetForm();
      
      // Hide success message after 3 seconds
      setTimeout(() => clearSuccess(), 3000);
    }
  };

  const filteredGenres = genres.filter(genre => genre !== 'All');

  return (
    <div className="movie-request-form">
      <h2 className="mb-4">Movie Request Form</h2>
      
      {showSuccess && (
        <Alert variant="success" dismissible onClose={clearSuccess}>
          Request submitted. Thank you!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={fields.title}
                onChange={handleInputChange}
                isInvalid={!!errors.title}
                placeholder="Enter movie title"
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Genre *</Form.Label>
              <Form.Select
                name="genre"
                value={fields.genre}
                onChange={handleInputChange}
                isInvalid={!!errors.genre}
              >
                <option value="">Select genre</option>
                {filteredGenres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.genre}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Year *</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={fields.year}
                onChange={handleInputChange}
                isInvalid={!!errors.year}
                placeholder="Enter year"
                min="1900"
              />
              <Form.Control.Feedback type="invalid">
                {errors.year}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes) *</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={fields.duration}
                onChange={handleInputChange}
                isInvalid={!!errors.duration}
                placeholder="Enter duration"
                min="1"
              />
              <Form.Control.Feedback type="invalid">
                {errors.duration}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={fields.description}
            onChange={handleInputChange}
            isInvalid={!!errors.description}
            placeholder="Enter movie description (minimum 30 characters)"
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            {fields.description.length}/30 characters minimum
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit" size="lg" disabled={hasErrors}>
          Submit Request
        </Button>
      </Form>
    </div>
  );
};

MovieRequestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MovieRequestForm;
