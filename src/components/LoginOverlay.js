import React, { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Toast from '../components/ui/Toast'; // Import the custom Toast component

const LoginOverlay = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toastConfig, setToastConfig] = useState(null);

/**
 * Displays a toast notification with a given message and type.
 *
 * @param {string} message - The message to display in the toast.
 * @param {string} type - The type of the toast, which determines its styling (e.g., 'success', 'error', 'info').
 */
  const showToast = (message, type) => {
    setToastConfig({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      await login(email, password);
      showToast('Login successful!', 'success');
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showToast('Incorrect email or password', 'error');
      } else if (error.response && error.response.status === 404) {
        showToast('User does not exist', 'error');
      } else {
        showToast('Login failed. Please try again.', 'error');
      }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}
      style={{ zIndex: 40 }}
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-sm sm:max-w-md mx-4 relative" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 mb-2">
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 mb-2">
              <FaLock className="inline mr-2" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:underline"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastConfig && (
        <Toast
          message={toastConfig.message}
          type={toastConfig.type}
          onClose={() => setToastConfig(null)}
        />
      )}
    </div>
  );
};

export default LoginOverlay;
