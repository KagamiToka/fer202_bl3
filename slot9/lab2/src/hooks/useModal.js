import { useReducer, useCallback } from 'react';

// Modal action types
const MODAL_ACTIONS = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
  SET_DATA: 'SET_DATA'
};

// Modal state
const initialModalState = {
  show: false,
  data: null
};

// Modal reducer
const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.SHOW:
      return {
        ...state,
        show: true
      };
    
    case MODAL_ACTIONS.HIDE:
      return {
        ...state,
        show: false,
        data: null
      };
    
    case MODAL_ACTIONS.SET_DATA:
      return {
        ...state,
        data: action.payload,
        show: true
      };
    
    default:
      return state;
  }
};

// Custom modal hook
export const useModal = () => {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);

  const showModal = useCallback(() => {
    dispatch({ type: MODAL_ACTIONS.SHOW });
  }, []);

  const hideModal = useCallback(() => {
    dispatch({ type: MODAL_ACTIONS.HIDE });
  }, []);

  const setModalData = useCallback((data) => {
    dispatch({ type: MODAL_ACTIONS.SET_DATA, payload: data });
  }, []);

  const showModalWithData = useCallback((data) => {
    dispatch({ type: MODAL_ACTIONS.SET_DATA, payload: data });
  }, []);

  return {
    show: state.show,
    data: state.data,
    showModal,
    hideModal,
    setModalData,
    showModalWithData
  };
};
