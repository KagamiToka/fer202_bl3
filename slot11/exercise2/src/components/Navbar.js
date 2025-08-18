import React from "react";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Student Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Students</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Quick search" className="me-2" />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
