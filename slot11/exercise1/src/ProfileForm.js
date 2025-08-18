import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Toast, Modal, Card } from "react-bootstrap";

function ProfileForm({ initialName, initialEmail, initialAge }) {
  const [name, setName] = useState(initialName || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [age, setAge] = useState(initialAge);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Validation
  const isNameValid = name && name.trim() !== "";
  const isEmailValid = email.includes("@");
  const isAgeValid = age >= 1;
  const isFormValid = isNameValid && isEmailValid && isAgeValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  return (
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!isNameValid}
          />
          <Form.Control.Feedback type="invalid">
            Name cannot be empty.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!isEmailValid}
          />
          <Form.Control.Feedback type="invalid">
            Email must contain @.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            isInvalid={!isAgeValid}
          />
          <Form.Control.Feedback type="invalid">
            Age must be at least 1.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </Form>

      {/* Toast */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="mt-3"
        bg="success"
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
      </Toast>

      {/* Modal with Card */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>Email: {email}</Card.Text>
              <Card.Text>Age: {age}</Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}

// PropTypes validation
ProfileForm.propTypes = {
  initialName: PropTypes.string,
  initialEmail: PropTypes.string,
  initialAge: PropTypes.number,
};

// Default props
ProfileForm.defaultProps = {
  initialName: "",
  initialEmail: "",
  initialAge: 1,
};

export default ProfileForm;
