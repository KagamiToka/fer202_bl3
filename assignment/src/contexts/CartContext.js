import { createContext, useReducer, useEffect, useMemo } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload);
    case 'INC_QTY':
      return state.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
    case 'DEC_QTY':
      return state.map((item) =>
        item.id === action.payload && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items]);
  const subtotal = useMemo(() =>
    items.reduce((sum, item) => sum + (item.salePrice || item.price) * item.qty, 0),
    [items]
  );

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const incQty = (id) => dispatch({ type: 'INC_QTY', payload: id });
  const decQty = (id) => dispatch({ type: 'DEC_QTY', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ items, count, subtotal, addToCart, removeFromCart, incQty, decQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}