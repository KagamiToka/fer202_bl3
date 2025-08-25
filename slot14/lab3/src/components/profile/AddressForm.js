import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function AddressForm({ data, onChange }) {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={data.country}
          onChange={(e) => onChange("address", "country", e.target.value)}
          isInvalid={!data.country}
        >
          <option value="">-- Select country --</option>
          <option>Viet Nam</option>
          <option>Korea</option>
          <option>Italy</option>
          <option>Japan</option>
          <option>USA</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Street Number</Form.Label>
            <Form.Control
              value={data.streetNumber}
              onChange={(e) => onChange("address", "streetNumber", e.target.value)}
              isInvalid={!data.streetNumber}
            />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>Street Name</Form.Label>
            <Form.Control
              value={data.streetName}
              onChange={(e) => onChange("address", "streetName", e.target.value)}
              isInvalid={!data.streetName}
            />
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control
          value={data.city}
          onChange={(e) => onChange("address", "city", e.target.value)}
          isInvalid={!data.city}
        />
        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

AddressForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AddressForm;
