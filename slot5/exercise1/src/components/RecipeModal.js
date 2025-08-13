import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { StoreContext } from '../store/StoreContext';
import { closeModal } from '../store/actions';
import './RecipeModal.css';

export default function RecipeModal() {
  const { state, dispatch } = useContext(StoreContext);
  const recipe = state.selectedRecipe;

  if (!recipe) return null;

  return (
    <Modal
      show={state.showModal}
      onHide={() => closeModal(dispatch)}
      centered
      size="lg"
      className="recipe-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <p className="recipe-desc">{recipe.description}</p>
        <div className="recipe-info">
          <p><strong>🍽 Servings:</strong> {recipe.servings}</p>
          <p><strong>⏱ Prep:</strong> {recipe.prep} mins</p>
          <p><strong>🔥 Cook:</strong> {recipe.cook} mins</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success">Add to Cart</Button>
        <Button variant="outline-secondary" onClick={() => closeModal(dispatch)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
