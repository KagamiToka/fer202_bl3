import { createContext, useReducer, useEffect, useCallback } from 'react';

export const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      console.log('Setting wishlist to:', action.payload); // Debug
      return action.payload;
    case 'TOGGLE_WISHLIST':
      const newState = state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload];
      console.log('Toggling wishlist, new state:', newState, 'from action:', action.payload); // Debug
      return newState;
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const initialState = () => {
    const saved = localStorage.getItem('wishlist');
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Invalid wishlist in localStorage, resetting:', e);
      return [];
    }
  };

  const [wishlist, dispatch] = useReducer(wishlistReducer, initialState());

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    try {
      const parsed = JSON.parse(savedWishlist) || [];
      if (JSON.stringify(wishlist) !== JSON.stringify(parsed)) {
        console.log('Syncing wishlist to localStorage:', wishlist); // Debug
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
      }
    } catch (e) {
      console.error('Error parsing wishlist from localStorage:', e);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const toggleWishlist = useCallback((productId) => {
    console.log('Calling toggleWishlist with productId:', productId); // Debug
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
  }, []); // Không phụ thuộc vào state để tránh re-render

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}