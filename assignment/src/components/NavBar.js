import { useState, useCallback } from 'react';
import { Container, Form } from 'react-bootstrap';
import useDebounce from '../hooks/useDebounce';

function NavBar({ onSearch, onSort }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce((value) => onSearch(value), 300);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  return (
    <Container className="mb-3">
      <Form className="d-flex gap-3">
        <Form.Control
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Form.Select onChange={(e) => onSort(e.target.value)}>
          <option value="name-asc">Name A→Z</option>
          <option value="price-asc">Price Ascending</option>
          <option value="price-desc">Price Descending</option>
        </Form.Select>
      </Form>
    </Container>
  );
}

export default NavBar;