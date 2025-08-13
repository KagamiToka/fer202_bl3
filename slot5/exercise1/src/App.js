import React, { useContext } from 'react';
import { Container, Form, Spinner, Alert } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import { StoreProvider, StoreContext } from './store/StoreContext';
import { setSearch } from './store/actions';
import './style.css';
import './App.css'

function AppContent() {
  const { state, dispatch } = useContext(StoreContext);

  const filteredRecipes = state.recipes.filter(r =>
    r.title.toLowerCase().includes(state.search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container className='flex-grow-1'>
        <div className="text-center mb-4">
          <h2>Explore our simple, healthy recipes</h2>
          <p>Discover quick, whole-food dishes that fit real-life schedules and taste amazing.</p>
        </div>

        <Form className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search by name or ingredient..."
            value={state.search}
            onChange={(e) => setSearch(dispatch, e.target.value)}
          />
        </Form>

        {state.loading && <Spinner animation="border" />}
        {state.error && <Alert variant="danger">{state.error}</Alert>}

        <RecipeList recipes={filteredRecipes} />
      </Container>

      <RecipeModal />
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
