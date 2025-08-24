import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { WishlistContext } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function Wishlist() {
  const { wishlist } = useContext(WishlistContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/products', {
      params: { id: wishlist },
    }).then((response) => {
      setProducts(response.data);
    });
  }, [wishlist]);

  return (
    <Container className="mt-5">
      <h2>Wishlist</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Wishlist;