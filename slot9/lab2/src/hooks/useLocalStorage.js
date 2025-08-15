import { useReducer, useEffect, useCallback } from 'react';

// Local storage action types
const STORAGE_ACTIONS = {
  SET_ITEM: 'SET_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR: 'CLEAR'
};

// Local storage reducer
const storageReducer = (state, action) => {
  switch (action.type) {
    case STORAGE_ACTIONS.SET_ITEM:
      return {
        ...state,
        [action.payload.key]: action.payload.value
      };
    
    case STORAGE_ACTIONS.REMOVE_ITEM:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    
    case STORAGE_ACTIONS.CLEAR:
      return {};
    
    default:
      return state;
  }
};

// Custom hook for localStorage management
export const useLocalStorage = (key, initialValue) => {
  const [state, dispatch] = useReducer(storageReducer, { [key]: initialValue });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        const parsedValue = JSON.parse(item);
        dispatch({
          type: STORAGE_ACTIONS.SET_ITEM,
          payload: { key, value: parsedValue }
        });
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  // Set value in localStorage and state
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(state[key]) : value;
      
      // Save to state
      dispatch({
        type: STORAGE_ACTIONS.SET_ITEM,
        payload: { key, value: valueToStore }
      });
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  // Remove item from localStorage and state
  const removeValue = useCallback(() => {
    try {
      dispatch({ type: STORAGE_ACTIONS.REMOVE_ITEM, payload: key });
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  // Clear all localStorage
  const clearAll = useCallback(() => {
    try {
      dispatch({ type: STORAGE_ACTIONS.CLEAR });
      window.localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, []);

  return [state[key], setValue, removeValue, clearAll];
};
