import { useReducer, useCallback } from 'react';

// Toast action types
const TOAST_ACTIONS = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
  SET_MESSAGE: 'SET_MESSAGE'
};

// Toast state
const initialToastState = {
  show: false,
  message: '',
  variant: 'success',
  delay: 3000
};

// Toast reducer
const toastReducer = (state, action) => {
  switch (action.type) {
    case TOAST_ACTIONS.SHOW:
      return {
        ...state,
        show: true,
        message: action.payload.message || state.message,
        variant: action.payload.variant || state.variant,
        delay: action.payload.delay || state.delay
      };
    
    case TOAST_ACTIONS.HIDE:
      return {
        ...state,
        show: false
      };
    
    case TOAST_ACTIONS.SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    
    default:
      return state;
  }
};

// Custom toast hook
export const useToast = () => {
  const [state, dispatch] = useReducer(toastReducer, initialToastState);

  const showToast = useCallback((message, variant = 'success', delay = 3000) => {
    dispatch({
      type: TOAST_ACTIONS.SHOW,
      payload: { message, variant, delay }
    });
  }, []);

  const hideToast = useCallback(() => {
    dispatch({ type: TOAST_ACTIONS.HIDE });
  }, []);

  const setMessage = useCallback((message) => {
    dispatch({ type: TOAST_ACTIONS.SET_MESSAGE, payload: message });
  }, []);

  return {
    ...state,
    showToast,
    hideToast,
    setMessage
  };
};
