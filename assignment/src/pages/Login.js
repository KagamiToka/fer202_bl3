import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, ToastContainer, Toast } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);
  const { login, setRedirect, redirectUri } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectUri = params.get('redirect_uri');
    if (redirectUri) setRedirect(redirectUri);
  }, [location, setRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate(redirectUri || '/');
    } else {
      setToast({ message: 'Invalid email or password', type: 'danger' });
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
      <p className="mt-3">
        New customer? <Link to="/register">Create an account</Link>
      </p>
      {toast && (
        <ToastContainer position="bottom-end" className="p-3">
          <Toast
            bg={toast.type}
            onClose={() => setToast(null)}
            delay={3000}
            autohide
          >
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
}

export default Login;