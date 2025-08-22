import React, { createContext, useEffect, useMemo, useReducer } from 'react';

const initialState = {
  items: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, items: action.payload || [] };
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i.id === action.payload.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY': {
      const { id, quantity } = action.payload;
      return { ...state, items: state.items.map(i => i.id === id ? { ...i, quantity } : i) };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export const CartContext = createContext({
  items: [],
  add: () => {},
  remove: () => {},
  updateQuantity: () => {},
  clear: () => {},
  total: 0
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart_items') || '[]');
    dispatch({ type: 'INIT', payload: stored });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(state.items));
  }, [state.items]);

  const add = (product) => dispatch({ type: 'ADD', payload: product });
  const remove = (id) => dispatch({ type: 'REMOVE', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  const clear = () => dispatch({ type: 'CLEAR' });

  const total = useMemo(() => state.items.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0), [state.items]);

  const value = useMemo(() => ({ items: state.items, add, remove, updateQuantity, clear, total }), [state.items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


