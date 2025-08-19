import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import '../even-card.css';

function StudentCard({ student, onView }) {
    if (!student) return null;
  return (
    <Card className="h-100 even-card">
      {student.avatar ? (
        <Card.Img variant="top" src={student.avatar} alt={student.name} />
      ) : (
        <div className="bg-secondary text-white text-center p-5">No Avatar</div>
      )}
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          <strong>ID:</strong> {student.id} <br />
          <strong>Email:</strong> {student.email} <br />
          <strong>Age:</strong> {student.age}
        </Card.Text>
        <Button onClick={() => onView(student)}>View Details</Button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onView: PropTypes.func.isRequired,
};

export default StudentCard;
