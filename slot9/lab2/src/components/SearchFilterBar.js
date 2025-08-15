import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';

const SearchFilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedGenre, 
  onGenreChange, 
  sortBy, 
  onSortChange,
  genres,
  resultCount 
}) => {
  return (
    <Row className="mb-4">
      <Col md={4}>
        <InputGroup>
          <InputGroup.Text>
            🔍
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </InputGroup>
      </Col>
      
      <Col md={3}>
        <Form.Select
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Form.Select>
      </Col>
      
      <Col md={3}>
        <Form.Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="none">None</option>
          <option value="duration-asc">Duration ↑</option>
          <option value="duration-desc">Duration ↓</option>
        </Form.Select>
      </Col>
      
      <Col md={2}>
        <div className="text-end">
          <small className="text-muted">
            {resultCount} movie{resultCount !== 1 ? 's' : ''} found
          </small>
        </div>
      </Col>
    </Row>
  );
};

SearchFilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  resultCount: PropTypes.number.isRequired
};

export default SearchFilterBar;
