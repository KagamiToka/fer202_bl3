import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import PropTypes from "prop-types";

function ProfilePreview({ data, onClose }) {
  const { about, account, address } = data;
  return (
    <Container className="py-3">
      <Card>
        {about.avatarUrl && <Card.Img variant="top" src={about.avatarUrl} />}
        <Card.Body>
          <Card.Title>Your Profile</Card.Title>
          <hr />
          <h5>About</h5>
          <p>
            <strong>Name:</strong> {about.fullName}<br/>
            <strong>Email:</strong> {about.email}<br/>
            <strong>Age:</strong> {about.age}
          </p>
          <h5>Account</h5>
          <p>
            <strong>Username:</strong> {account.username}<br/>
            <strong>Question:</strong> {account.question}<br/>
            <strong>Answer:</strong> {account.answer}
          </p>
          <h5>Address</h5>
          <p>
            <strong>Country:</strong> {address.country}<br/>
            <strong>Street:</strong> {address.streetNumber} {address.streetName}<br/>
            <strong>City:</strong> {address.city}
          </p>
        </Card.Body>
      </Card>
      <div className="text-end mt-3">
        <Button onClick={onClose}>Close</Button>
      </div>
    </Container>
  );
}

ProfilePreview.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProfilePreview;
