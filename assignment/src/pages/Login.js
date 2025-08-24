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
    <Container className="py-5 d-flex justify-content-center">
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: '#1e3a8a' }}>Login</h2>
        <Form onSubmit={handleSubmit} className="p-4 shadow-sm border rounded" style={{ backgroundColor: '#fff' }}>
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
          <Button variant="primary" type="submit" className="w-100 mb-3">
            Sign in
          </Button>
          <p className="text-center">
            New customer? <Link to="/register" style={{ color: '#1e3a8a' }}>Create an account</Link>
          </p>
        </Form>
        {toast && (
          <ToastContainer position="top-center" className="mt-3">
            <Toast bg={toast.type} onClose={() => setToast(null)} delay={3000} autohide>
              <Toast.Body>{toast.message}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </div>
    </Container>
  );
}

export default Login;