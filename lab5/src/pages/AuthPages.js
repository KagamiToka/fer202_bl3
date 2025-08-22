import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { Container, Form, Button, Alert } from "react-bootstrap";

export const Login = () => {
  const { login } = useContext(AuthContext);
  const { pushToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra thông tin đăng nhập (giả lập với localStorage)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      login({ email, name: user.name });
      pushToast("Login successful!", "success");
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } else {
      setError("Invalid email or password");
      pushToast("Login failed. Please check your credentials.", "danger");
    }
  };

  return (
    <Container className="my-4">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export const Profile = () => {
  const { state, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container className="my-4">
      <h2>Profile</h2>
      {state.isAuthenticated ? (
        <>
          <p><strong>Name:</strong> {state.user?.name}</p>
          <p><strong>Email:</strong> {state.user?.email}</p>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <p>Please login.</p>
      )}
    </Container>
  );
};

export const Checkout = () => (
  <Container className="my-4">
    <h2>Checkout</h2>
    <p>Checkout success. Thank you very much</p>
  </Container>
);