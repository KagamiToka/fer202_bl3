import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Alert } from "react-bootstrap";

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống!";
    } else if (formData.name.length < 3 || formData.name.length > 50) {
      newErrors.name = "Tên phải từ 3-50 ký tự!";
    }

    // Validate age
    const age = parseInt(formData.age, 10);
    if (!formData.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(age) || age < 18 || age > 100) {
      newErrors.age = "Tuổi phải từ 18-100!";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    // Validate phone
    const phoneRegex = /^\d{10,15}$/;
    if (!formData.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10-15 chữ số!";
    }

    // Validate checkbox
    if (!formData.agree) {
      newErrors.agree = "Bạn phải đồng ý với điều khoản!";
    }

    setErrors(newErrors);
    setShowAlert(Object.keys(newErrors).length > 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Container>
      <h3>Form Đăng Ký</h3>

      {showAlert && (
        <Alert variant="danger">
          <strong>Lỗi:</strong> Vui lòng sửa các lỗi bên dưới.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Age */}
        <Form.Group controlId="formAge">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Phone */}
        <Form.Group controlId="formPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Checkbox */}
        <Form.Group controlId="formAgree">
          <Form.Check
            type="checkbox"
            name="agree"
            label="Tôi đồng ý với điều khoản"
            checked={formData.agree}
            onChange={handleChange}
            isInvalid={!!errors.agree}
            feedback={errors.agree}
            feedbackType="invalid"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Gửi
        </Button>
      </Form>
    </Container>
  );
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default UserForm;
