import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../ui/Toast'; // Make sure to import the Toast component

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'admin123') {
      setShowToast(true);
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000); // Delay navigation to allow toast to show
    } else {
      setError('Invalid email or password');
      setShowToast(true);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
    setError(''); // Reset error message when toast is closed
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        {showToast && (
          <Toast 
            message={error ? error : "Login successful!"} 
            onClose={handleCloseToast} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminLogin;