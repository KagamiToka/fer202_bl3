import React, { useReducer, useMemo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Nav, ProgressBar, Toast } from "react-bootstrap";

import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import ProfilePreview from "./ProfilePreview";

const initialState = {
  step: 0,
  about: { fullName: "", email: "", age: "", avatar: null, avatarUrl: "" },
  account: { username: "", password: "", confirm: "", question: "", answer: "" },
  address: { country: "", streetNumber: "", streetName: "", city: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.section]: { ...state[action.section], [action.field]: action.value },
      };
    case "NEXT":
      return { ...state, step: Math.min(state.step + 1, 2) };
    case "PREV":
      return { ...state, step: Math.max(state.step - 1, 0) };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function ProfileWizard({ show, onClose }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const setField = useCallback((section, field, value) => {
    dispatch({ type: "SET_FIELD", section, field, value });
  }, []);
  const nextStep = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prevStep = useCallback(() => dispatch({ type: "PREV" }), []);

  const isStepValid = useMemo(() => {
    if (state.step === 0) {
      const { fullName, email, age } = state.about;
      return !!fullName && /^\S+@\S+\.\S+$/.test(email || "") && Number(age) > 0;
    }
    if (state.step === 1) {
      const { username, password, confirm, question, answer } = state.account;
      return (
        username.length >= 6 &&
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password || "") &&
        confirm === password &&
        question &&
        answer
      );
    }
    if (state.step === 2) {
        const { country, streetNumber, streetName, city } = state.address;
        return !!country && !!streetNumber && !!streetName && !!city;
    }
    return false;
  }, [state]);

  const progress = useMemo(() => ((state.step + 1) / 3) * 100, [state.step]);

  const handleFinish = useCallback(() => {
    setShowPreview(true);
    setShowToast(true);
  }, []);

  const closeAll = useCallback(() => {
    setShowPreview(false);
    dispatch({ type: "RESET" });
    onClose();
  }, [onClose]);

  return (
    <>
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Build your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar now={progress} className="mb-3" />
          <Nav variant="tabs" activeKey={state.step} className="mb-3">
            <Nav.Item><Nav.Link eventKey={0} disabled>About</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey={1} disabled>Account</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey={2} disabled>Address</Nav.Link></Nav.Item>
          </Nav>

          {state.step === 0 && <AboutForm data={state.about} onChange={setField} />}
          {state.step === 1 && <AccountForm data={state.account} onChange={setField} />}
          {state.step === 2 && <AddressForm data={state.address} onChange={setField} />}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={prevStep} hidden={state.step === 0}>
            Previous
          </Button>
          {state.step < 2 ? (
            <Button onClick={nextStep} disabled={!isStepValid}>Next</Button>
          ) : (
            <Button onClick={handleFinish} disabled={!isStepValid}>Finish</Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfilePreview data={state} onClose={() => setShowPreview(false)} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeAll}>Done</Button>
        </Modal.Footer>
      </Modal>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-fixed"
        style={{ top: 20, right: 20, zIndex: 1080 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2500}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </div>
    </>
  );
}

ProfileWizard.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
