import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../ui/LoadingSpinner';

const AuthContext = createContext();

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const initialUserState = {
  firstName: '',
  lastName: '',
  token: null,
  role: null,
  email: '',
  contact: '',
  countryCode: ''
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || initialUserState);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(initialUserState);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/');
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

      navigate(userData.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const userData = response.data;

      if (userData.role !== 'admin') {
        throw new Error('Access denied. Admins only.');
      }

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

      navigate('/admin');
    } catch (error) {
      console.error('Admin login error:', error);
      throw new Error(error.response?.data?.message || 'Admin login failed');
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post('/api/auth/register', formData);
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const verifyToken = useCallback(async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.token) {
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = storedUser.role === 'admin' ? '/api/auth/admin/verify' : '/api/auth/verify';
      const response = await axios.get(endpoint, { headers: { Authorization: `Bearer ${storedUser.token}` } });

      const updatedUser = { ...storedUser, ...response.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    if (user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user.token]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, register, logout, isAuthenticated: !!user.token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
