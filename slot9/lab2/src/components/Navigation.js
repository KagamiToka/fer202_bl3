import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = ({ currentPage, onPageChange }) => {
  const handleNavClick = (page) => {
    onPageChange(page);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="mb-4">
      <Container>
        <Navbar.Brand 
          href="#home" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('movies');
          }}
          className="fw-bold"
        >
          Movie Explorer
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              active={currentPage === 'movies'}
              onClick={() => handleNavClick('movies')}
            >
              Free Movies
            </Nav.Link>
            <Nav.Link
              active={currentPage === 'favorites'}
              onClick={() => handleNavClick('favorites')}
            >
              My Favourite Movies
            </Nav.Link>
            <Nav.Link
              active={currentPage === 'form'}
              onClick={() => handleNavClick('form')}
            >
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.propTypes = {
  currentPage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Navigation;
