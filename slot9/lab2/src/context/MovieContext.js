import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { movies, allGenres } from '../data/movies';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from '../hooks/useToast';
import { useModal } from '../hooks/useModal';

// Initial state
const initialState = {
  movies: movies,
  allGenres: allGenres,
  searchTerm: '',
  selectedGenre: 'All',
  sortBy: 'none',
  currentPage: 'movies'
};

// Action types
export const ACTIONS = {
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_SELECTED_GENRE: 'SET_SELECTED_GENRE',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE'
};

// Reducer function
const movieReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    
    case ACTIONS.SET_SELECTED_GENRE:
      return {
        ...state,
        selectedGenre: action.payload
      };
    
    case ACTIONS.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };
    
    case ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    
    default:
      return state;
  }
};

// Create context
const MovieContext = createContext();

// Provider component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  
  // Use custom hooks
  const [favorites, setFavorites] = useLocalStorage('movieFavorites', []);
  const toast = useToast();
  const modal = useModal();

  // Computed values using useMemo
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = state.movies;

    // Filter by search term
    if (state.searchTerm.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (state.selectedGenre !== 'All') {
      filtered = filtered.filter(movie => movie.genre === state.selectedGenre);
    }

    // Sort by duration
    if (state.sortBy === 'duration-asc') {
      filtered = [...filtered].sort((a, b) => a.duration - b.duration);
    } else if (state.sortBy === 'duration-desc') {
      filtered = [...filtered].sort((a, b) => b.duration - a.duration);
    }

    return filtered;
  }, [state.searchTerm, state.selectedGenre, state.sortBy, state.movies]);

  // Get current movies based on page
  const currentMovies = state.currentPage === 'favorites' 
    ? state.movies.filter(movie => favorites.includes(movie.id))
    : filteredAndSortedMovies;

  // Toggle favorite function
  const toggleFavorite = (movieId) => {
    const isFavorite = favorites.includes(movieId);
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== movieId);
    } else {
      newFavorites = [...favorites, movieId];
    }
    
    setFavorites(newFavorites);
    
    // Show toast message
    const message = isFavorite ? 'Removed from favourites!' : 'Added to favourites!';
    toast.showToast(message, 'success');
  };

  // Show movie details
  const showMovieDetails = (movie) => {
    modal.showModalWithData(movie);
  };

  // Context value
  const value = {
    state,
    dispatch,
    favorites,
    toggleFavorite,
    filteredAndSortedMovies,
    currentMovies,
    resultCount: currentMovies.length,
    toast,
    modal,
    showMovieDetails
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook to use the context
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};
