import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function AboutForm({ data, onChange }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Full name</Form.Label>
        <Form.Control
          value={data.fullName}
          onChange={(e) => onChange("about", "fullName", e.target.value)}
          isInvalid={!data.fullName}
        />
        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
      </Form.Group>
      <Row>
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={data.email}
              onChange={(e) => onChange("about", "email", e.target.value)}
              isInvalid={!/^\S+@\S+\.\S+$/.test(data.email || "")}
            />
            <Form.Control.Feedback type="invalid">
              Invalid email (email must contain "@" and ".")
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={data.age}
              onChange={(e) => onChange("about", "age", Number(e.target.value))}
              isInvalid={!data.age}
            />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const url = URL.createObjectURL(file);
            onChange("about", "avatar", file);
            onChange("about", "avatarUrl", url);
          }}
        />
      </Form.Group>
      {data.avatarUrl && (
        <div className="text-center">
          <img
            src={data.avatarUrl}
            alt="avatar preview"
            className="rounded"
            style={{ maxHeight: 140 }}
          />
        </div>
      )}
    </Form>
  );
}

AboutForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AboutForm;
