import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';
import { AuthContext } from '../contexts/AuthContext';
import Toast from '../components/Toast';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((err) => setError('Failed to load product details. Please try again.'));
  }, [id]);

  const handleWishlistClick = () => {
    if (!user) {
      setToast({ message: 'Please sign in to save wishlist', type: 'info' });
      navigate(`/login?redirect_uri=${encodeURIComponent(window.location.pathname)}`);
    } else {
      toggleWishlist(product.id);
      setToast({
        message: wishlist.includes(product.id) ? 'Removed from wishlist!' : 'Added to wishlist!',
        type: 'success',
      });
    }
  };

  if (error) return <Container>{error}</Container>;
  if (!product) return <Container>Loading...</Container>;

  return (
    <Container className="py-5">
      <Card className="shadow-lg border-0 rounded-3 overflow-hidden">
        {product.tags.includes('hot') && (
          <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-2 p-2 rounded-pill">
            Hot
          </Badge>
        )}
        <Card.Img 
          variant="top" 
          src={product.image || '/placeholder-image.jpg'} 
          alt={product.title} 
          style={{ objectFit: 'cover', height: '450px', borderRadius: '0' }} 
          onError={(e) => { e.target.src = '/placeholder-image.jpg'; }} 
        />
        <Card.Body className="p-4">
          <Card.Title className="fs-4 fw-bold text-primary">{product.title}</Card.Title>
          <Card.Text className="text-muted mb-2">{product.name}</Card.Text>
          <Card.Text className="mb-3">
            {product.salePrice ? (
              <>
                <span className="text-decoration-line-through text-muted me-2">${product.price}</span>
                <span className="fs-5 fw-bold text-warning">${product.salePrice}</span>
              </>
            ) : (
              <span className="fs-5 fw-bold text-primary">${product.price}</span>
            )}
          </Card.Text>
          <Card.Text className="mb-4">{product.description}</Card.Text>
          <div className="d-flex gap-3">
            <Button
              variant="primary"
              className="flex-grow-1 rounded-pill py-2"
              onClick={() => {
                addToCart(product);
                setToast({ message: 'Added to cart!', type: 'success' });
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant={wishlist.includes(product.id) ? 'outline-secondary' : 'outline-primary'}
              className="flex-grow-1 rounded-pill py-2"
              onClick={handleWishlistClick}
            >
              {wishlist.includes(product.id) ? 'View Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </Card.Body>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </Container>
  );
}

export default ProductDetails;