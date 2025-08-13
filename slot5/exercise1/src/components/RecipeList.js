import React, { useContext } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import { StoreContext } from '../store/StoreContext';
import { viewRecipe } from '../store/actions';

export default function RecipeList({ recipes }) {
  const { dispatch } = useContext(StoreContext);

  if (!recipes || recipes.length === 0) {
    return (
      <Alert variant="warning" className="text-center my-4">
        Không tìm thấy công thức nào. Vui lòng thử từ khóa khác.
      </Alert>
    );
  }

  return (
    <Row>
      {recipes.map((r, idx) => (
        <Col md={4} className="mb-4" key={idx}>
          <RecipeCard recipe={r} onView={() => viewRecipe(dispatch, r)} />
        </Col>
      ))}
    </Row>
  );
}
