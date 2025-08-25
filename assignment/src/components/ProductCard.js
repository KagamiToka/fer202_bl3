import { useContext, useMemo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Badge, Toast, ToastContainer } from "react-bootstrap";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AuthContext } from "../contexts/AuthContext";
import React from "react";

function ProductCard({ product, isWishlistPage = false }) {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const isWished = useMemo(() => wishlist.includes(product.id), [wishlist, product.id]);

  const handleWishlistClick = useCallback(() => {
    console.log('Wishlist click on product:', product.id); // Debug
    if (!user) {
      setToast({ message: 'Please sign in to save wishlist', type: 'info' });
      navigate(`/login?redirect_uri=${encodeURIComponent(window.location.pathname)}`);
    } else if (isWished && !isWishlistPage) {
      navigate('/wishlist'); // Navigate to wishlist if already added, chỉ ngoài wishlist page
    } else if (!isWished) {
      toggleWishlist(product.id);
      setToast({
        message: 'Added to wishlist!',
        type: 'success',
      });
    }
  }, [user, navigate, toggleWishlist, product.id, isWished, isWishlistPage]);

  const handleAddToCart = useCallback(() => {
    addToCart(product);
    setToast({ message: "Added to cart!", type: "success" });
  }, [addToCart, product]);

  return (
    <Card className="position-relative">
      {product.tags.includes("hot") && (
        <Badge bg="danger" className="badge-hot">
          Hot
        </Badge>
      )}
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.name}</Card.Text>
        <Card.Text>
          {product.salePrice ? (
            <>
              <span className="text-decoration-line-through me-2">
                ${product.price}
              </span>
              <span>${product.salePrice}</span>
            </>
          ) : (
            <span>${product.price}</span>
          )}
        </Card.Text>
        {!isWishlistPage && (
          <div className="d-flex gap-2 mt-2">
            <Button
              variant="primary"
              onClick={handleAddToCart}
              className="card-button flex-grow-1"
            >
              Add to Cart
            </Button>
            <Button
              variant="success"
              as={Link}
              to={`/product/${product.id}`}
              className="card-button flex-grow-1"
            >
              View Details
            </Button>
            <Button
              variant={isWished ? "outline-secondary" : "outline-primary"}
              onClick={handleWishlistClick}
              className="card-button flex-grow-1"
            >
              {isWished ? "View Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        )}
        {toast && (
          <ToastContainer position="bottom-end" className="p-3">
            <Toast
              bg={toast.type}
              onClose={() => setToast(null)}
              delay={3000}
              autohide
            >
              <Toast.Body>{toast.message}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </Card.Body>
    </Card>
  );
}

export default React.memo(ProductCard, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id &&
         prevProps.product.title === nextProps.product.title &&
         prevProps.isWishlistPage === nextProps.isWishlistPage;
});