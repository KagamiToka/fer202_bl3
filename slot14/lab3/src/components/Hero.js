import React from "react";
import { Container } from "react-bootstrap";

function Hero() {
  return (
    <div className="bg-light py-5 text-center">
      <Container>
        <h1 className="display-4">Student Management</h1>
        <p className="lead">A simple React app to manage and view student information.</p>
      </Container>
    </div>
  );
}

export default Hero;
