import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

function AccountForm({ data, onChange }) {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={data.username}
          onChange={(e) => onChange("account", "username", e.target.value)}
          isInvalid={(data.username || "").length < 6}
        />
        <Form.Control.Feedback type="invalid">
          Min 6 characters
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type={showPwd ? "text" : "password"}
            value={data.password}
            onChange={(e) => onChange("account", "password", e.target.value)}
            isInvalid={
              !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(data.password || "")
            }
          />
          <Button variant="outline-secondary" onClick={() => setShowPwd((s) => !s)}>
            {showPwd ? <FaEyeSlash /> : <FaEye />}
          </Button>
          <Form.Control.Feedback type="invalid">
            Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character.
          </Form.Control.Feedback>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Confirm password</Form.Label>
        <div className="d-flex gap-2">
          <Form.Control
            type={showConfirm ? "text" : "password"}
            value={data.confirm}
            onChange={(e) => onChange("account", "confirm", e.target.value)}
            isInvalid={!!data.password && data.confirm !== data.password}
          />
          <Button variant="outline-secondary" onClick={() => setShowConfirm((s) => !s)}>
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </Button>
        </div>
        <Form.Control.Feedback type="invalid">
          Passwords do not match
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Secret question</Form.Label>
        <Form.Select
          value={data.question}
          onChange={(e) => onChange("account", "question", e.target.value)}
          isInvalid={!data.question}
        >
          <option value="">-- Select one --</option>
          <option>What is your first pet’s name?</option>
          <option>What is your mother’s maiden name?</option>
          <option>In which city were you born?</option>
          <option>Who was your favorite teacher?</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Answer</Form.Label>
        <Form.Control
          value={data.answer}
          onChange={(e) => onChange("account", "answer", e.target.value)}
          isInvalid={!data.answer}
        />
        <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}

AccountForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AccountForm;
