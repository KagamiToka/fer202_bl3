import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, ListGroup, Image, Button, Form } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const CartPage = () => {
  const { items, updateQuantity, remove, clear, total } =
    useContext(CartContext);
  const { state: auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!auth.isAuthenticated) navigate("/login");
    else navigate("/checkout");
  };

  return (
    <Container>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>
          Cart is empty. <Link to="/products">Continue shopping</Link>
        </p>
      ) : (
        <>
          <ListGroup>
            {items.map((i) => (
              <ListGroup.Item key={i.id} className="d-flex align-items-center">
                <Image src={i.image} alt={i.title} width={80} thumbnail />
                <div className="ms-3">
                  <h5>{i.title}</h5>
                  <p>${i.price.toFixed(2)}</p>
                </div>
                <div className="ms-auto d-flex align-items-center">
                  <Form.Control
                    type="number"
                    min={1}
                    value={i.quantity || 1}
                    onChange={(e) =>
                      updateQuantity(i.id, Math.max(1, Number(e.target.value)))
                    }
                    style={{ width: 64 }}
                  />
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => remove(i.id)}
                  >
                    Remove
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-3 d-flex justify-content-between">
            <div>
              <p>
                <strong>Total items:</strong>{" "}
                {items.reduce((n, i) => n + (i.quantity || 1), 0)}
              </p>
              <p>
                <strong>Total price:</strong> ${total.toFixed(2)}
              </p>
            </div>
            <div>
              <Button variant="outline-secondary" onClick={clear}>
                Clear cart
              </Button>
              <Button
                variant="primary"
                className="ms-2"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
