import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { AuthContext } from '../contexts/AuthContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const isWished = useMemo(() => wishlist.includes(product.id), [wishlist, product.id]);

  const handleWishlistClick = () => {
  if (!user) {
    if (!toast) { // Chỉ set toast nếu chưa có
      setToast({ message: 'Please sign in to save wishlist', type: 'info' });
      navigate(`/login?redirect_uri=${encodeURIComponent(window.location.pathname)}`);
    }
  } else {
    toggleWishlist(product.id);
    setToast({
      message: isWished ? 'Removed from wishlist!' : 'Added to wishlist!',
      type: 'success',
    });
  }
};

  return (
    <Card className="position-relative">
      {product.tags.includes('hot') && <Badge bg="danger" className="badge-hot">Hot</Badge>}
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.name}</Card.Text>
        <Card.Text>
          {product.salePrice ? (
            <>
              <span className="text-decoration-line-through me-2">${product.price}</span>
              <span>${product.salePrice}</span>
            </>
          ) : (
            <span>${product.price}</span>
          )}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => {
            addToCart(product);
            setToast({ message: 'Added to cart!', type: 'success' });
          }}
        >
          Add to Cart
        </Button>
        <Button variant="success" as={Link} to={`/product/${product.id}`}>
          View Details
        </Button>
        <Button
          variant={isWished ? 'outline-secondary' : 'outline-primary'}
          onClick={handleWishlistClick}
        >
          {isWished ? 'View Wishlist' : 'Add to Wishlist'}
        </Button>
      </Card.Body>
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
    </Card>
  );
}

export default ProductCard;