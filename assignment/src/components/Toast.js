import { useEffect } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function CustomToast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast bg={type} onClose={onClose} delay={3000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default CustomToast;