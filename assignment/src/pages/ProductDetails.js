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
  const { addToCart } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`).then((response) => {
      setProduct(response.data);
    });
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

  if (!product) return <Container>Loading...</Container>;

  return (
    <Container className="mt-5">
      <Card>
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
          <Card.Text>{product.description}</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              addToCart(product);
              setToast({ message: 'Added to cart!', type: 'success' });
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant={wishlist.includes(product.id) ? 'outline-secondary' : 'outline-primary'}
            onClick={handleWishlistClick}
            className="ms-2"
          >
            {wishlist.includes(product.id) ? 'View Wishlist' : 'Add to Wishlist'}
          </Button>
        </Card.Body>
      </Card>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </Container>
  );
}

export default ProductDetails;