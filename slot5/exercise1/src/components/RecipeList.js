import React, { useContext, useState } from 'react';
import { Alert, Carousel, Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import { StoreContext } from '../store/StoreContext';
import { viewRecipe } from '../store/actions';

export default function RecipeList({ recipes }) {
  const { dispatch } = useContext(StoreContext);
  const [index, setIndex] = useState(0);

  if (!recipes || recipes.length === 0) {
    return (
      <Alert variant="warning" className="text-center my-4">
        Không tìm thấy công thức nào. Vui lòng thử từ khóa khác.
      </Alert>
    );
  }

  // Get first 3 recipes for carousel showcase
  const showcaseRecipes = recipes.slice(0, 3);
  
  // Get remaining recipes for the list
  const remainingRecipes = recipes.slice(3);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="recipe-layout">
      {/* Carousel Showcase - Top */}
      <div className="carousel-showcase mb-5">
        <h3 className="text-center mb-4 text-success fw-bold">
          🌟 Featured Recipes
        </h3>
        <Carousel 
          activeIndex={index} 
          onSelect={handleSelect}
          interval={4000}
          pause="hover"
          className="recipe-carousel-showcase"
          indicators={showcaseRecipes.length > 1}
          controls={showcaseRecipes.length > 1}
        >
          {showcaseRecipes.map((recipe, slideIndex) => (
            <Carousel.Item key={slideIndex} className="carousel-showcase-item">
              <div className="showcase-content">
                <Row className="g-4 justify-content-center">
                  <Col lg={8} md={10} sm={12}>
                    <div className="showcase-recipe-card">
                      <Row className="g-0">
                        <Col md={6}>
                          <img 
                            src={recipe.image} 
                            alt={recipe.title}
                            className="showcase-image"
                          />
                        </Col>
                        <Col md={6}>
                          <div className="showcase-details p-4">
                            <h4 className="showcase-title mb-3">{recipe.title}</h4>
                            <p className="showcase-description mb-4">{recipe.description}</p>
                            <div className="showcase-info d-flex justify-content-between mb-4">
                              <div className="text-center">
                                <div className="text-primary mb-1">⏱</div>
                                <small className="text-muted">Prep</small>
                                <div className="fw-bold">{recipe.prep} min</div>
                              </div>
                              <div className="text-center">
                                <div className="text-danger mb-1">🔥</div>
                                <small className="text-muted">Cook</small>
                                <div className="fw-bold">{recipe.cook} min</div>
                              </div>
                              <div className="text-center">
                                <div className="text-warning mb-1">🍽</div>
                                <small className="text-muted">Servings</small>
                                <div className="fw-bold">{recipe.servings}</div>
                              </div>
                            </div>
                            <button 
                              className="btn btn-success w-100 rounded-pill"
                              onClick={() => viewRecipe(dispatch, recipe)}
                            >
                              👨‍🍳 View Recipe
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Full Recipe List - Bottom */}
      <div className="recipe-list-section">
        <h3 className="text-center mb-4 text-success fw-bold">
          📚 All Recipes
        </h3>
        <div className="recipe-grid">
          {recipes.map((recipe, idx) => (
            <div key={idx} className="fade-in">
              <RecipeCard recipe={recipe} onView={() => viewRecipe(dispatch, recipe)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
