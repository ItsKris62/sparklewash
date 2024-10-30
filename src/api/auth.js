// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Registration request
export const register = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Registration failed' };
    }
};

// Login request
export const login = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, formData, { withCredentials: true });
        return response.data; // Expects response to include role information
    } catch (error) {
        throw error.response?.data || { message: 'Login failed' };
    }
};

// Logout request
export const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    } catch (error) {
        console.error('Logout error', error);
    }
};
