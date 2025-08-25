import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer bg-white text-black py-3 mt-auto">
      <Container className="text-center">
        <p>&copy; 2025 Your E-Commerce Store. All rights reserved.</p>
        <p>
          <a href="/contact" className="text-warning text-decoration-none mx-2">Contact</a> |
          <a href="/terms" className="text-warning text-decoration-none mx-2">Terms</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;