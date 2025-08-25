import { useContext, useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { WishlistContext } from '../contexts/WishlistContext';
import { CartContext } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Wishlist on load (read-only):', wishlist); // Debug
    if (wishlist.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    axios.get('http://localhost:3001/products')
      .then((response) => {
        const wishlistProducts = response.data.filter((product) => wishlist.includes(product.id));
        console.log('Filtered products:', wishlistProducts); // Debug
        setProducts(wishlistProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [wishlist]);

  const handleRemove = useCallback((productId) => {
    console.log('Removing product ID:', productId); // Debug
    toggleWishlist(productId);
  }, [toggleWishlist]);

  const handleAddToCart = useCallback((product) => {
    console.log('Adding to cart:', product.title); // Debug
    addToCart(product);
  }, [addToCart]);

  if (loading) return <Container className="py-5">Loading...</Container>;
  if (wishlist.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info" className="text-center">
          Your wishlist is empty. <a href="/">Start shopping!</a>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Wishlist ({wishlist.length} items)</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} isWishlistPage={true} />
            <div className="d-flex gap-2 mt-2 justify-content-between wishlist-buttons">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemove(product.id)}
                className="wishlist-button"
              >
                Remove from Wishlist
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAddToCart(product)}
                className="wishlist-button"
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        ))}
        {products.length === 0 && (
          <Col>
            <Alert variant="warning">No products found in wishlist.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Wishlist;