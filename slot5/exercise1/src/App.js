import React, { useContext, useState } from 'react';
import { Container, Form, Spinner, Alert, Row, Col, Dropdown, Pagination, Button } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import RecipeRequestForm from './components/RecipeRequestForm';
import { StoreProvider, StoreContext } from './store/StoreContext';
import { setSearch, setSortBy, setCurrentPage, setItemsPerPage } from './store/actions';
import './style.css';
import './App.css'

function AppContent() {
  const { state, dispatch } = useContext(StoreContext);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Filter recipes based on search
  const filteredRecipes = state.recipes.filter(r =>
    r.title.toLowerCase().includes(state.search.toLowerCase())
  );

  // Sort recipes based on selected criteria
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (state.sortBy) {
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      case 'prep-asc':
        return a.prep - b.prep;
      case 'prep-desc':
        return b.prep - a.prep;
      case 'cook-asc':
        return a.cook - b.cook;
      case 'cook-desc':
        return b.cook - a.cook;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedRecipes.length / state.itemsPerPage);
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const currentRecipes = sortedRecipes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(dispatch, page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(dispatch, items);
    setCurrentPage(dispatch, 1); // Reset to first page
  };

  return (
    <>
      <Header onRequestFormClick={() => setShowRequestForm(true)} />
      <Container className='flex-grow-1'>
        <div className="text-center mb-4">
          <h2>Explore our simple, healthy recipes</h2>
          <p>Discover quick, whole-food dishes that fit real-life schedules and taste amazing.</p>
        </div>

        {/* Search and Sort Controls */}
        <Row className="mb-4">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by name or ingredient..."
              value={state.search}
              onChange={(e) => setSearch(dispatch, e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Dropdown onSelect={(key) => setSortBy(dispatch, key)}>
              <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown" className="w-100">
                Sort by: {state.sortBy === 'name-asc' ? 'Name A→Z' : 
                          state.sortBy === 'name-desc' ? 'Name Z→A' :
                          state.sortBy === 'prep-asc' ? 'Prep ↑' :
                          state.sortBy === 'prep-desc' ? 'Prep ↓' :
                          state.sortBy === 'cook-asc' ? 'Cook ↑' :
                          state.sortBy === 'cook-desc' ? 'Cook ↓' : 'Default'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="name-asc">Name A→Z</Dropdown.Item>
                <Dropdown.Item eventKey="name-desc">Name Z→A</Dropdown.Item>
                <Dropdown.Item eventKey="prep-asc">Prep Time ↑</Dropdown.Item>
                <Dropdown.Item eventKey="prep-desc">Prep Time ↓</Dropdown.Item>
                <Dropdown.Item eventKey="cook-asc">Cook Time ↑</Dropdown.Item>
                <Dropdown.Item eventKey="cook-desc">Cook Time ↓</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3}>
            <Dropdown onSelect={(key) => handleItemsPerPageChange(parseInt(key))}>
              <Dropdown.Toggle variant="outline-secondary" id="items-dropdown" className="w-100">
                {state.itemsPerPage} items per page
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="6">6 items per page</Dropdown.Item>
                <Dropdown.Item eventKey="9">9 items per page</Dropdown.Item>
                <Dropdown.Item eventKey="12">12 items per page</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        {state.loading && <Spinner animation="border" />}
        {state.error && <Alert variant="danger">{state.error}</Alert>}

        <RecipeList recipes={currentRecipes} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.First 
                onClick={() => handlePageChange(1)}
                disabled={state.currentPage === 1}
              />
              <Pagination.Prev 
                onClick={() => handlePageChange(state.currentPage - 1)}
                disabled={state.currentPage === 1}
              />
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Pagination.Item
                  key={page}
                  active={page === state.currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
              
              <Pagination.Next 
                onClick={() => handlePageChange(state.currentPage + 1)}
                disabled={state.currentPage === totalPages}
              />
              <Pagination.Last 
                onClick={() => handlePageChange(totalPages)}
                disabled={state.currentPage === totalPages}
              />
            </Pagination>
          </div>
        )}
      </Container>

      <RecipeModal />
      <RecipeRequestForm 
        show={showRequestForm} 
        onHide={() => setShowRequestForm(false)} 
      />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
