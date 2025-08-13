import axios from 'axios';
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_ERROR,
  SET_SEARCH,
  VIEW_RECIPE,
  CLOSE_MODAL
} from './types';

const API_URL = 'http://localhost:5000/recipes';
export const fetchRecipes = (dispatch) => {
  dispatch({ type: FETCH_START });
  axios.get(API_URL)
    .then(res => {
      dispatch({ type: FETCH_SUCCESS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: FETCH_ERROR, payload: 'Failed to load recipes' });
    });
};

export const setSearch = (dispatch, value) => {
  dispatch({ type: SET_SEARCH, payload: value });
};

export const viewRecipe = (dispatch, recipe) => {
  dispatch({ type: VIEW_RECIPE, payload: recipe });
};

export const closeModal = (dispatch) => {
  dispatch({ type: CLOSE_MODAL });
};
