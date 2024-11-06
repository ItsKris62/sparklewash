import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import axios from 'axios';
import SideNav from '../layouts/SideNav';

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    countryCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        contact: user.contact || '',
        countryCode: user.countryCode || ''
      });
    }
  }, [user]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!user?.token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.put('/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      setUser(prevUser => ({
        ...prevUser,
        ...response.data
      }));
      setSuccess(true);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err) {
      console.error('Profile update error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update profile';
      setError(errorMessage);

      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [formData, user?.token, setUser, logout, navigate]);

  // Validate form data
  const isFormValid = useCallback(() => {
    return formData.firstName.trim() && 
           formData.lastName.trim() && 
           formData.email.trim() &&
           formData.contact.trim();
  }, [formData]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 p-4 md:p-8 ml-16 md:ml-64">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Profile Management</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md" role="alert">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md" role="alert">
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-gray-100"
                  disabled
                />
              </div>
              
              <div>
                <label htmlFor="contact" className="block text-gray-700 mb-2">Contact</label>
                <div className="flex">
                  <input
                    id="countryCode"
                    type="text"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-20 p-2 border rounded-l focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1"
                    required
                  />
                  <input
                    id="contact"
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="flex-1 p-2 border-t border-b border-r rounded-r focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className="mt-6 w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;