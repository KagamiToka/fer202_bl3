import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const validateInput = (input) => input.length > 5;

function ValidateInput() {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (validateInput(inputValue)) {
      setIsValid(true);
      setErrorMessage("");
    } else {
      setIsValid(false);
      setErrorMessage("Input must be longer than 5 characters.");
    }
  }, [inputValue]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form>
            <Form.Group controlId="validatedInput">
              <Form.Label>Nhập giá trị</Form.Label>
              <Form.Control
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                isInvalid={!isValid && inputValue.length > 0}
              />
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" type="submit" disabled={!isValid}>
                Gửi
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ValidateInput;
