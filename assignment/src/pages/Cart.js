import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';

function Cart() {
  const { items, incQty, decQty, removeFromCart, subtotal } = useContext(CartContext);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4" style={{ color: '#1e3a8a' }}>Cart</h2>
      <Table striped bordered hover className="shadow-sm">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.salePrice || item.price}</td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={() => decQty(item.id)}>-</Button>
                {' '}{item.qty}{' '}
                <Button variant="outline-primary" size="sm" onClick={() => incQty(item.id)}>+</Button>
              </td>
              <td>${(item.salePrice || item.price) * item.qty}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-end mt-3">
        <p className="fw-bold" style={{ color: '#1e3a8a' }}>Total: ${subtotal}</p>
        <Button as={Link} to="/checkout" variant="primary" className="mt-2">
          Proceed to Checkout
        </Button>
      </div>
    </Container>
  );
}

export default Cart;