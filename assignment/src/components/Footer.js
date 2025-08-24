import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-light py-3 mt-5">
      <Container>
        <p className="text-center mb-0">&copy; 2025 Your Name. All rights reserved.</p>
        <p className="text-center">
          <a href="https://github.com/yourusername">GitHub</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;