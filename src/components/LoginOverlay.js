import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom'; // Make sure you have react-router-dom installed

const LoginOverlay = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages
  const navigate = useNavigate(); // Correct usage of useNavigate

  // Define your test credentials
  const testCredentials = {
    email: 'test@example.com',
    password: 'password123',
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Simple authentication check
    if (email === testCredentials.email && password === testCredentials.password) {
      // Redirect to UserDashboard using navigate
      navigate('/user-dashboard'); // Use navigate directly, no push method
      onClose(); // Close the overlay
    } else {
      setErrorMessage('Invalid credentials. Please try again.'); // Set error message for invalid login
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`} style={{ zIndex: 40 }}>
      <div className="bg-white rounded-lg p-8 shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div> // Display error message
          )}
          <button type="submit" className="w-full bg-navy text-white rounded-lg py-2">Login</button>
        </form>
        <button className="text-blue-500 mt-4" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginOverlay;