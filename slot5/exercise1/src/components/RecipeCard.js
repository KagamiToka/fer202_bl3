import React from "react";
import { Card, Button } from "react-bootstrap";

export default function RecipeCard({ recipe, onView }) {
  return (
    <Card className="recipe-card h-100 shadow-sm">
      <Card.Img variant="top" src={recipe.image} className="recipe-image" />
      <Card.Body className="d-flex flex-column">
        <div>
          <Card.Title>{recipe.title}</Card.Title>
          <Card.Text className="text-muted">{recipe.description}</Card.Text>
        </div>
        <div className="mt-auto">
          <p>🍽 Servings: {recipe.servings}</p>
          <p>⏱ Prep: {recipe.prep}</p>
          <p>🔥 Cook: {recipe.cook}</p>
          <Button variant="success" onClick={() => onView(recipe)}>
            View Recipe
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
