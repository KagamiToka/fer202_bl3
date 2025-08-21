import React, {useContext} from "react";
import {CartContext} from "./CartContext";

const Cart = () => {
    const {cartItem, removeFromCart, clearCart, totalPrice} = useContext(CartContext);

    const handleConfirmOrder = () => {
        if (cartItem.length === 0) return;
        alert("Thanh toán thành công! Cảm ơn bạn đã đặt hàng.");
        clearCart();
    };

    return (
        <div className="container">
            <div className="cart">
                <h2>Giỏ hàng</h2>
                {cartItem.length === 0 ? (
                    <p className="cart-empty">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div>
                        <ul className="cart-list">
                            {cartItem.map(item => (
                                <li className="cart-item" key={item.id}>
                                    <span>{item.name}</span>
                                    <div className="cart-actions">
                                        <span>${parseFloat(item.price).toFixed(2)}</span>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Xóa</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-actions">
                            <p><strong>Tổng số món:</strong> {cartItem.length}</p>
                            <p><strong>Tổng giá:</strong> ${totalPrice}</p>
                            <button className="btn btn-outline" onClick={clearCart}>Xóa giỏ hàng</button>
                            <button className="btn btn-primary" onClick={handleConfirmOrder}>Xác nhận đơn hàng</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;