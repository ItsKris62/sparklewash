import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
        try {
            // Update the endpoint to match your backend
            const response = await axios.get('/api/users/profile', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setUserData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error.message || 'Failed to fetch user data');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.token) {
            fetchUserData();
        }
    }, [user]);

    // Rest of your component code...
}; 