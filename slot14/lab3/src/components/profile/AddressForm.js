import React from "react";
import { Form } from "react-bootstrap";
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

      <Form.Group>
        <Form.Label>Address detail</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={data.detail}
          onChange={(e) => onChange("address", "detail", e.target.value)}
          isInvalid={!data.detail}
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
