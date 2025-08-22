import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { Navbar, Nav, Button, Dropdown, Container } from "react-bootstrap";

const NavBar = () => {
  const { items: cartItems } = useContext(CartContext);
  const { items: favItems } = useContext(FavouritesContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { state: auth } = useContext(AuthContext);

  return (
    <Navbar
      bg={isDark ? "dark" : "light"}
      variant={isDark ? "dark" : "light"}
      expand="lg"
      className="mb-4"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">FoodStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-secondary" onClick={toggleTheme} className="me-2">
              {isDark ? "Light" : "Dark"}
            </Button>
            <Nav.Link as={NavLink} to="/favourites" className="position-relative">
              ❤
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {favItems.length}
              </span>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" className="position-relative">
              🛒
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItems.reduce((n, i) => n + (i.quantity || 1), 0)}
              </span>
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-profile" className="text-decoration-none">
                👤
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/favourites">My Favourites</Dropdown.Item>
                {auth.isAuthenticated ? (
                  <Dropdown.Item as={NavLink} to="/logout">Logout</Dropdown.Item>
                ) : (
                  <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;