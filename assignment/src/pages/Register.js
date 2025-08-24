import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, ProgressBar, Image } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import Toast from '../components/Toast';

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: null,
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    answer: '',
  });
  const [toast, setToast] = useState(null);
  const { register, redirectUri } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateStep1 = () => {
    if (!formData.name) return 'Name is required';
    if (!formData.email.includes('@')) return 'Invalid email';
    if (formData.avatar && formData.avatar.size > 2 * 1024 * 1024) return 'Avatar must be ≤2MB';
    if (formData.avatar && !['image/jpeg', 'image/png'].includes(formData.avatar.type))
      return 'Avatar must be JPG or PNG';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.username) return 'Username is required';
    if (formData.password.length < 6 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password))
      return 'Password must be ≥6 characters, with uppercase, lowercase, and special character';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    if (!formData.secretQuestion) return 'Secret question is required';
    if (!formData.answer) return 'Answer is required';
    return null;
  };

  const handleNext = () => {
    const error = validateStep1();
    if (error) {
      setToast({ message: error, type: 'danger' });
    } else {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    const error = validateStep2();
    if (error) {
      setToast({ message: error, type: 'danger' });
    } else {
      await register({
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        secretQuestion: formData.secretQuestion,
        answer: formData.answer,
      });
      setToast({ message: 'Registration successful. You are now signed in.', type: 'success' });
      setTimeout(() => navigate(redirectUri || '/'), 2000);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register - Step {step}</h2>
      <ProgressBar now={step * 50} label={`Step ${step}/2`} className="mb-3" />
      {step === 1 ? (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="file"
              name="avatar"
              accept="image/jpeg,image/png"
              onChange={handleInputChange}
            />
            {formData.avatar && (
              <Image
                src={URL.createObjectURL(formData.avatar)}
                alt="Avatar Preview"
                width="100"
                className="mt-3"
              />
            )}
          </Form.Group>
          <Button variant="primary" onClick={handleNext}>
            Next
          </Button>
        </Form>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Secret Question</Form.Label>
            <Form.Select
              name="secretQuestion"
              value={formData.secretQuestion}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a secret question</option>
              <option value="What is your pet's name?">What is your pet's name?</option>
              <option value="What is your favorite book?">What is your favorite book?</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              name="answer"
              placeholder="Enter answer"
              value={formData.answer}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="secondary" onClick={() => setStep(1)} className="me-2">
            Previous
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </Container>
  );
}

export default Register;