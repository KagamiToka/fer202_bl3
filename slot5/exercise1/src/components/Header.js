import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function Header({ onRequestFormClick }) {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="shadow-sm mb-4">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4">
          🥗 Healthy Recipe Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link href="/about" className="fw-semibold">
              About
            </Nav.Link>
            <Nav.Link href="/recipes" className="fw-semibold">
              Recipes
            </Nav.Link>
            <Nav.Link 
              onClick={onRequestFormClick} 
              className="fw-semibold text-warning"
              style={{ cursor: 'pointer' }}
            >
              📝 Recipe Request Form
            </Nav.Link>
          </Nav>
          <Button variant="warning" className="fw-bold text-dark">
            Browse Recipes
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
