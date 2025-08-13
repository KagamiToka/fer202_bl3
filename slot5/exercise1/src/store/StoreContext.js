import React, { createContext, useReducer, useEffect } from 'react';
import { reducer, initialState } from './reducer';
import { fetchRecipes } from './actions';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchRecipes(dispatch);
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
