// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

axios.defaults.baseURL = 'http://localhost:5000'; // Replace with your backend's URL

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    token: null,
  });
  const navigate = useNavigate();

  // User login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, firstName, lastName } = response.data;
      setUser({ token, firstName, lastName });
      localStorage.setItem('token', token);
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Login failed.');
    }
  };

  // Admin login function
  const adminLogin = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, role, firstName, lastName } = response.data;

      if (role === 'admin') {
        setUser({ token, firstName, lastName });
        localStorage.setItem('token', token);
        navigate('/admin-dashboard');
      } else {
        throw new Error('Access denied. Admins only.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      throw new Error(error.response?.data?.message || 'Admin login failed.');
    }
  };

  // Register a new user
  const register = async (formData) => {
    try {
      const response = await axios.post('/api/auth/register', formData);
      const { token, firstName, lastName } = response.data;
      setUser({ token, firstName, lastName });
      localStorage.setItem('token', token);
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data?.message || 'Registration failed.');
    }
  };

  // Logout current user
  const logout = () => {
    setUser({ firstName: '', lastName: '', token: null });
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Retrieve token from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(prevUser => ({ ...prevUser, token }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, adminLogin, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);
