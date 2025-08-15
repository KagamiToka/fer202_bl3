import React from 'react';
import { Container, Row, Col, Alert, Toast, ToastContainer } from 'react-bootstrap';
import MovieCard from './components/MovieCard';
import SearchFilterBar from './components/SearchFilterBar';
import MovieDetailsModal from './components/MovieDetailsModal';
import MovieRequestForm from './components/MovieRequestForm';
import HeroCarousel from './components/HeroCarousel';
import Navigation from './components/Navigation';
import { MovieProvider, useMovieContext, ACTIONS } from './context/MovieContext';
import './App.css';

// Main App Content Component
const AppContent = () => {
  const { 
    state, 
    dispatch, 
    currentMovies, 
    resultCount, 
    favorites, 
    toggleFavorite, 
    toast, 
    modal, 
    showMovieDetails 
  } = useMovieContext();

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // In a real app, this would send data to an API
  };

  const renderMoviesGrid = () => {
    if (currentMovies.length === 0) {
      const message = state.currentPage === 'favorites' 
        ? 'No favourites yet.'
        : 'No movies found';
      
      return (
        <Alert variant="info" className="text-center">
          {message}
        </Alert>
      );
    }

    return (
      <Row className="g-4">
        {currentMovies.map(movie => (
          <Col key={movie.id} xs={12} md={6} lg={4}>
            <MovieCard
              movie={movie}
              onAddToFavorites={toggleFavorite}
              onShowDetails={showMovieDetails}
              isFavorite={favorites.includes(movie.id)}
            />
          </Col>
        ))}
      </Row>
    );
  };

  const renderContent = () => {
    switch (state.currentPage) {
      case 'movies':
        return (
          <>
            <HeroCarousel />
            <SearchFilterBar
              searchTerm={state.searchTerm}
              onSearchChange={(value) => dispatch({ type: ACTIONS.SET_SEARCH_TERM, payload: value })}
              selectedGenre={state.selectedGenre}
              onGenreChange={(value) => dispatch({ type: ACTIONS.SET_SELECTED_GENRE, payload: value })}
              sortBy={state.sortBy}
              onSortChange={(value) => dispatch({ type: ACTIONS.SET_SORT_BY, payload: value })}
              genres={state.allGenres}
              resultCount={resultCount}
            />
            {renderMoviesGrid()}
          </>
        );
      
      case 'favorites':
        return (
          <>
            <h2 className="mb-4">My Favourite Movies</h2>
            {renderMoviesGrid()}
          </>
        );
      
      case 'form':
        return (
          <MovieRequestForm
            onSubmit={handleFormSubmit}
            genres={state.allGenres}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Navigation 
        currentPage={state.currentPage} 
        onPageChange={(page) => dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page })} 
      />
      
      <Container className="mt-4">
        {renderContent()}
      </Container>

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={modal.data}
        show={modal.show}
        onHide={modal.hideModal}
      />

      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={toast.show} 
          onClose={toast.hideToast}
          delay={toast.delay}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Movie Explorer</strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

// Main App Component with Provider
function App() {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
}

export default App;
