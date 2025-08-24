import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, redirectUri: state.redirectUri };
    case 'LOGOUT':
      return { user: null, redirectUri: null };
    case 'SET_REDIRECT':
      return { ...state, redirectUri: action.payload };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem('user')) || null,
    redirectUri: null,
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  const login = async (email, password) => {
    try {
      const response = await axios.get('http://localhost:3001/accounts', {
        params: { email, password },
      });
      if (response.data.length > 0) {
        dispatch({ type: 'LOGIN', payload: response.data[0] });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (data) => {
    const response = await axios.get('http://localhost:3001/accounts');
    const newId = response.data.length ? Math.max(...response.data.map((acc) => acc.id)) + 1 : 1;
    const newUser = { id: newId, ...data, wishlist: [] };
    await axios.post('http://localhost:3001/accounts', newUser);
    dispatch({ type: 'LOGIN', payload: newUser });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, redirectUri: state.redirectUri, login, logout, register, setRedirect: (uri) => dispatch({ type: 'SET_REDIRECT', payload: uri }) }}>
      {children}
    </AuthContext.Provider>
  );
}