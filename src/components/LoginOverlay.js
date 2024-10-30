// src/components/LoginOverlay.js
import React, { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const LoginOverlay = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Attempt login
      onClose(); // Close overlay on success
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`} style={{ zIndex: 40 }}>
      <div className="bg-white rounded-lg p-8 shadow-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <FaEnvelope className="inline mr-2" /> Email:
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              <FaLock className="inline mr-2" /> Password:
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition-all">
            Login
          </button>
        </form>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default LoginOverlay;
