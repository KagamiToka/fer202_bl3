import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { Container, ListGroup, Button } from "react-bootstrap";

const Cart = () => {
    const { cartItem, removeFromCart, clearCart, totalPrice } = useContext(CartContext);

    const handleConfirmOrder = () => {
        if (cartItem.length === 0) return;
        alert("Thanh toán thành công! Cảm ơn bạn đã đặt hàng.");
        clearCart();
    };

    return (
        <Container className="my-4">
            <h2>Giỏ hàng</h2>
            {cartItem.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div>
                    <ListGroup className="mb-3">
                        {cartItem.map((item) => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <span>{item.name}</span>
                                <div>
                                    <span className="me-3">${parseFloat(item.price).toFixed(2)}</span>
                                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                                        Xóa
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="d-flex flex-column align-items-end">
                        <p><strong>Tổng số món:</strong> {cartItem.length}</p>
                        <p><strong>Tổng giá:</strong> ${totalPrice}</p>
                        <div>
                            <Button variant="outline-secondary" className="me-2" onClick={clearCart}>
                                Xóa giỏ hàng
                            </Button>
                            <Button variant="primary" onClick={handleConfirmOrder}>
                                Xác nhận đơn hàng
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Cart;