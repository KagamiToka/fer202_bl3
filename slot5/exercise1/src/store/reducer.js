import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SET_SEARCH,
  SET_SORT_BY,
  SET_CURRENT_PAGE,
  SET_ITEMS_PER_PAGE,
  VIEW_RECIPE,
  CLOSE_MODAL,
  TOGGLE_FAVOURITE
} from './types';

export const initialState = {
  recipes: [],
  loading: false,
  error: '',
  search: '',
  sortBy: 'name-asc',
  currentPage: 1,
  itemsPerPage: 6,
  selectedRecipe: null,
  showModal: false,
  favourites: []
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
      return { ...state, search: action.payload, currentPage: 1 };
    case SET_SORT_BY:
      return { ...state, sortBy: action.payload, currentPage: 1 };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_ITEMS_PER_PAGE:
      return { ...state, itemsPerPage: action.payload, currentPage: 1 };
    case VIEW_RECIPE:
      return { ...state, selectedRecipe: action.payload, showModal: true };
    case CLOSE_MODAL:
      return { ...state, showModal: false, selectedRecipe: null };
    case TOGGLE_FAVOURITE:
      const recipeId = action.payload;
      const isFavourite = state.favourites.includes(recipeId);
      if (isFavourite) {
        return { ...state, favourites: state.favourites.filter(id => id !== recipeId) };
      } else {
        return { ...state, favourites: [...state.favourites, recipeId] };
      }
    default:
      return state;
  }
};
