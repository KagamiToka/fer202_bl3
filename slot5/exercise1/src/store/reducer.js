import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SET_SEARCH,
  VIEW_RECIPE,
  CLOSE_MODAL
} from './types';

export const initialState = {
  recipes: [],
  loading: false,
  error: '',
  search: '',
  selectedRecipe: null,
  showModal: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, error: '' };
    case FETCH_SUCCESS:
      return { ...state, loading: false, recipes: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    case VIEW_RECIPE:
      return { ...state, selectedRecipe: action.payload, showModal: true };
    case CLOSE_MODAL:
      return { ...state, showModal: false, selectedRecipe: null };
    default:
      return state;
  }
};
