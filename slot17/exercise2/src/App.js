import './App.css';
import { CartProvider } from './components/CartContext';
import DishesList from './components/DishesList';
import Cart from './components/Cart';
import './style.css';
import React, { useEffect, useState } from 'react';

const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/pizza.jpg",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
 },
 {
    id: 1,
    name: "Zucchipakoda",
    image: "images/xkUElXq.jpg",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
 },
 {
    id: 2,
    name: "Vadonut",
    image: "images/tu-lam-banh-afc-khoai-lang-va-donut-khoai-lang-1.jpg",
    price: "1.99",
    description: "A combination of vada and donut.",
 },
 {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/PinkCake01.webp",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
 },
];

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(prev => !prev);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-dark', isDark);
    root.classList.toggle('theme-light', !isDark);
  }, [isDark]);

  return (
    <CartProvider>
      <div className={`App ${isDark ? 'theme-dark' : 'theme-light'}`}>
          <div className="container" style={{paddingTop: 16, paddingBottom: 0}}>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
              <button className="btn btn-outline" onClick={toggleTheme} aria-label="Toggle theme">
                {isDark ? 'Chế độ Sáng' : 'Chế độ Tối'}
              </button>
            </div>
          </div>
          <DishesList dishes={dishes} />
          <Cart />
      </div>
      <footer className="app-footer">
        <p>© 2023 Restaurant Menu. All rights reserved.</p>
      </footer>
    </CartProvider>
  );
}

export default App;
