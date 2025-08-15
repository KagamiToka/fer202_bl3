import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';

const MovieCard = ({ movie, onAddToFavorites, onShowDetails, isFavorite }) => {
  const handleAddToFavorites = () => {
    onAddToFavorites(movie.id);
  };

  const handleShowDetails = () => {
    onShowDetails(movie);
  };

  return (
    <Card className="h-100 movie-card">
      <Card.Img 
        variant="top" 
        src={movie.poster} 
        alt={`Poster for ${movie.title}`}
        className="movie-poster"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="movie-title">{movie.title}</Card.Title>
        <Card.Text className="movie-description">
          {movie.description.length > 100 
            ? `${movie.description.substring(0, 100)}...` 
            : movie.description
          }
        </Card.Text>
        
        <div className="movie-meta mb-3">
          <Row className="g-2">
            <Col xs={6}>
              <small className="text-muted">Year: {movie.year}</small>
            </Col>
            <Col xs={6}>
              <small className="text-muted">Duration: {movie.duration} min</small>
            </Col>
          </Row>
          <Row className="g-2">
            <Col xs={6}>
              <small className="text-muted">Country: {movie.country}</small>
            </Col>
            <Col xs={6}>
              <Badge bg="primary" className="genre-badge">
                {movie.genre}
              </Badge>
            </Col>
          </Row>
        </div>

        <div className="mt-auto">
          <Row className="g-2">
            <Col>
              <Button 
                variant={isFavorite ? "outline-danger" : "outline-primary"}
                size="sm" 
                onClick={handleAddToFavorites}
                className="w-100"
              >
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </Col>
            <Col>
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={handleShowDetails}
                className="w-100"
              >
                Details
              </Button>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onShowDetails: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
};

export default MovieCard;
