import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <div className="home-bg">
      <Container className="py-5">
        <HeroSlider />
        <h2 className="text-center mb-4" style={{ color: '#1e40af', fontWeight: '700' }}>
          Sản phẩm nổi bật
        </h2>
        <ProductGrid />
      </Container>
    </div>
  );
}

export default Home;