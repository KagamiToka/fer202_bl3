import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';

function Cart() {
  const { items, incQty, decQty, removeFromCart, subtotal } = useContext(CartContext);

  return (
    <Container className="mt-5">
      <h2>Cart</h2>
      <Table striped bordered hover>
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
      <p>Total: ${subtotal}</p>
      <Button as={Link} to="/checkout" variant="primary">
        Proceed to Checkout
      </Button>
    </Container>
  );
}

export default Cart;