import { createContext, useReducer, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      return action.payload;
    case 'TOGGLE_WISHLIST':
      return state.includes(action.payload)
        ? state.filter((id) => id !== action.payload)
        : [...state, action.payload];
    default:
      return state;
  }
};

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlist, dispatch] = useReducer(wishlistReducer, JSON.parse(localStorage.getItem('wishlist')) || []);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/accounts/${user.id}`)
        .then((response) => {
          const newWishlist = response.data.wishlist || [];
          if (JSON.stringify(newWishlist) !== JSON.stringify(wishlist)) {
            dispatch({ type: 'SET_WISHLIST', payload: newWishlist });
          }
        })
        .catch((error) => console.error('Error fetching wishlist:', error));
    } else {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [user, wishlist]); // Thêm wishlist vào dependency để đồng bộ khi wishlist thay đổi

  const toggleWishlist = async (productId) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: productId });
    if (user) {
      const updatedWishlist = wishlist.includes(productId)
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId];
      try {
        await axios.patch(`http://localhost:3001/accounts/${user.id}`, { wishlist: updatedWishlist });
      } catch (error) {
        console.error('Error updating wishlist:', error);
        // Rollback nếu API thất bại
        dispatch({ type: 'TOGGLE_WISHLIST', payload: productId }); // Hoàn tác thay đổi
      }
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}