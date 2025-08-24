import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import Toast from '../components/Toast';
import axios from 'axios';

function Checkout() {
  const { items, subtotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const handleCheckout = async () => {
    if (!user) {
      setToast({ message: 'Please sign in to checkout', type: 'info' });
      navigate(`/login?redirect_uri=/checkout`);
      return;
    }

    const order = {
      id: Date.now(),
      userId: user.id,
      items,
      total: subtotal,
      date: new Date().toISOString(),
    };

    await axios.post('http://localhost:3001/orders', order);
    clearCart();
    setToast({ message: 'Order placed successfully!', type: 'success' });
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <Container className="mt-5">
      <h2>Checkout</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.salePrice || item.price}</td>
              <td>{item.qty}</td>
              <td>${(item.salePrice || item.price) * item.qty}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>Total: ${subtotal}</p>
      <Button variant="primary" onClick={handleCheckout}>
        Place Order
      </Button>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </Container>
  );
}

export default Checkout;