import React, { createContext, useEffect, useMemo, useReducer } from 'react';

const initialState = {
  items: []
};

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, items: action.payload || [] };
    case 'TOGGLE': {
      const exists = state.items.some(i => i.id === action.payload.id);
      if (exists) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    default:
      return state;
  }
}

export const FavouritesContext = createContext({
  items: [],
  toggle: () => {},
  remove: () => {}
});

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('fav_items') || '[]');
    dispatch({ type: 'INIT', payload: stored });
  }, []);

  useEffect(() => {
    localStorage.setItem('fav_items', JSON.stringify(state.items));
  }, [state.items]);

  const toggle = (product) => dispatch({ type: 'TOGGLE', payload: product });
  const remove = (id) => dispatch({ type: 'REMOVE', payload: id });

  const value = useMemo(() => ({ items: state.items, toggle, remove }), [state.items]);
  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
};


