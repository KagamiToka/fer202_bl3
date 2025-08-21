import React, {createContext, useState, useEffect} from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const[cartItem, setCartItem] = useState([]);
        const addToCart = disk => {
            setCartItem((prevItems) => [...prevItems, disk]);
        };

        const removeFromCart = (diskId) => {
            setCartItem((prevItems) => prevItems.filter((item) => item.id !== diskId));
        }

        const clearCart = () => {
            setCartItem([]);
        }

        const totalPrice = cartItem.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

        useEffect(() => {
            const storedCart = JSON.parse(localStorage.getItem('cart'));
            if (storedCart) {
                setCartItem(storedCart);
            }
        }, []);

        useEffect(() => {
            localStorage.setItem('cart', JSON.stringify(cartItem));
        }, [cartItem]);

        return (
            <CartContext.Provider value={{cartItem, addToCart, removeFromCart, clearCart, totalPrice}}>
                {children}
            </CartContext.Provider>
        );
}