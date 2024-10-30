// src/api/axiosConfig.js
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const { logout } = useAuth();
      logout(); // Logs out on token expiration
    }
    return Promise.reject(error);
  }
);

export default instance;
