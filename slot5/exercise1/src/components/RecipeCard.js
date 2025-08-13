import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";

export default function RecipeCard({ recipe, onView }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    if (!isFavourite) {
      setShowToast(true);
      // Auto hide toast after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  return (
    <>
      <Card className="recipe-card h-100 shadow-lg border-0 rounded-3 overflow-hidden">
        <div className="position-relative">
          <Card.Img 
            variant="top" 
            src={recipe.image} 
            className="recipe-image"
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="position-absolute top-0 start-0 m-2">
            <Button
              variant={isFavourite ? "danger" : "outline-light"}
              size="sm"
              onClick={handleFavourite}
              className="rounded-circle"
              style={{ 
                width: '40px', 
                height: '40px',
                border: '2px solid white',
                backdropFilter: 'blur(10px)',
                backgroundColor: isFavourite ? 'rgba(220, 53, 69, 0.9)' : 'rgba(255, 255, 255, 0.2)'
              }}
            >
              {isFavourite ? '❤️' : '🤍'}
            </Button>
          </div>
        </div>
        
        <Card.Body className="d-flex flex-column p-4">
          <div className="mb-3">
            <Card.Title className="fw-bold text-dark mb-2" style={{ fontSize: '1.1rem', lineHeight: '1.3' }}>
              {recipe.title}
            </Card.Title>
            <Card.Text className="text-muted mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
              {recipe.description}
            </Card.Text>
          </div>
          
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-center">
                <div className="text-primary mb-1">⏱</div>
                <small className="text-muted fw-semibold">Prep</small>
                <div className="fw-bold text-dark">{recipe.prep} min</div>
              </div>
              <div className="text-center">
                <div className="text-danger mb-1">🔥</div>
                <small className="text-muted fw-semibold">Cook</small>
                <div className="fw-bold text-dark">{recipe.cook} min</div>
              </div>
              <div className="text-center">
                <div className="text-warning mb-1">🍽</div>
                <small className="text-muted fw-semibold">Servings</small>
                <div className="fw-bold text-dark">{recipe.servings}</div>
              </div>
            </div>
            
            <Button 
              variant="outline-success" 
              onClick={() => onView(recipe)}
              className="w-100 rounded-pill fw-semibold py-2"
              style={{ 
                borderWidth: '2px',
                transition: 'all 0.3s ease'
              }}
            >
              👨‍🍳 View Recipe
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg="success"
          text="white"
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>
            🎉 Added to favourites!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
