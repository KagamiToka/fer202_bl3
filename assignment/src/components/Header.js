import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const { items } = useContext(CartContext);
  const navigate = useNavigate();
  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">E-commerce</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user ? (
              <>
                <NavDropdown title={user.name} id="user-dropdown">
                  <NavDropdown.Item as={Link} to="/wishlist">Wishlist</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => { logout(); navigate('/'); }}>Sign out</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/cart">Cart <Badge bg="secondary">{cartCount}</Badge></Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Sign in</Nav.Link>
                <Nav.Link as={Link} to="/cart">Cart <Badge bg="secondary">{cartCount}</Badge></Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;