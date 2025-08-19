import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

function StudentDetailModal({ student, show, onClose }) {
  if (!student) return null;
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          {student.avatar && <Card.Img variant="top" src={student.avatar} />}
          <Card.Body>
            <Card.Title>{student.name}</Card.Title>
            <Card.Text>
              <strong>ID:</strong> {student.id} <br />
              <strong>Email:</strong> {student.email} <br />
              <strong>Age:</strong> {student.age}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentDetailModal;
