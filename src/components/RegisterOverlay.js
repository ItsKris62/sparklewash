// src/components/RegisterOverlay.js
import React, { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from 'react-icons/fa';

const RegisterOverlay = ({ isOpen, onClose }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+254',
    contact: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      await register(formData); // Assume register function exists in context
      onClose(); // Close the overlay on success
    } catch (error) {
      setErrorMessage(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`} style={{ zIndex: 40 }}>
      <div className="bg-white rounded-lg p-8 shadow-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleRegister}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              <FaUser className="inline mr-2" /> First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              <FaUser className="inline mr-2" /> Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Country Code and Contact Number */}
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mb-1 mr-2">
              <FaPhoneAlt className="inline mr-2" /> Contact
            </label>
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="border rounded-l-md bg-gray-100 py-2 px-4 focus:outline-none"
            >
              <option value="+254">+254 (KE)</option>
              <option value="+255">+255 (TZ)</option>
              <option value="+256">+256 (UG)</option>
            </select>
            <input
              type="text"
              name="contact"
              placeholder="123456789" // Placeholder for 9 digits
              value={formData.contact}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded-r-md w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              <FaLock className="inline mr-2" /> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              <FaLock className="inline mr-2" /> Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}

          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg py-2 hover:from-blue-600 hover:to-indigo-600 transition ease-in-out duration-200">
            Sign Up
          </button>
        </form>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          X
          </button>
      </div>
    </div>
  );
};

export default RegisterOverlay;