import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Badge, Row, Col } from 'react-bootstrap';

const MovieDetailsModal = ({ movie, show, onHide }) => {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <img 
              src={movie.poster} 
              alt={`Poster for ${movie.title}`}
              className="img-fluid rounded"
            />
          </Col>
          <Col md={8}>
            <h5>Description</h5>
            <p>{movie.description}</p>
            
            <Row className="mb-3">
              <Col xs={6}>
                <strong>Year:</strong> {movie.year}
              </Col>
              <Col xs={6}>
                <strong>Duration:</strong> {movie.duration} minutes
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col xs={6}>
                <strong>Country:</strong> {movie.country}
              </Col>
              <Col xs={6}>
                <strong>Genre:</strong> <Badge bg="primary">{movie.genre}</Badge>
              </Col>
            </Row>
            
            <h6>Showtimes</h6>
            <p className="text-muted">
              Showtimes will be available soon. Please check back later for screening schedules.
            </p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

MovieDetailsModal.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired
  }),
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default MovieDetailsModal;
