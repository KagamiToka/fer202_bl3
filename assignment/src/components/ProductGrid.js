import { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import NavBar from './NavBar';
import axios from 'axios';

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');

  useEffect(() => {
    axios.get('http://localhost:3001/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortOption === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'price-asc') {
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    }
    return result;
  }, [products, searchQuery, sortOption]);

  return (
    <Container>
      <NavBar onSearch={setSearchQuery} onSort={setSortOption} />
      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductGrid;