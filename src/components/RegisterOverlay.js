import React, { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { toast } from 'react-toastify';
import Toast from '../components/ui/Toast'; // Import custom Toast component

const RegisterOverlay = ({ isOpen, onClose, onSwitchToLogin }) => {
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

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const [toastConfig, setToastConfig] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      showToast('Please enter your full name', 'error');
      return false;
    }
    if (!formData.contact) {
      showToast('Please enter your contact number', 'error');
      return false;
    }
    if (!formData.email) {
      showToast('Please enter your email', 'error');
      return false;
    }
    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters long', 'error');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return false;
    }
    return true;
  };

  const showToast = (message, type) => {
    setToastConfig({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const registrationData = {
        ...formData,
        contact: `${formData.countryCode}${formData.contact}`,
      };
      delete registrationData.confirmPassword;

      await register(registrationData);
      showToast('Registration successful!', 'success');
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      showToast(error.response?.data?.message || 'Registration failed. Please try again.', 'error');
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}
      style={{ zIndex: 40 }}
    >
      <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg w-full max-w-xs sm:max-w-md mx-4 md:max-w-lg lg:max-w-xl relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-black" onClick={onClose}>
          X
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            {/* First Name */}
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 mb-2">
                <FaUser className="inline mr-2" /> First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Last Name */}
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 mb-2">
                <FaUser className="inline mr-2" /> Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Contact */}
          <div>
            <label className="block text-gray-700 mb-2">
              <FaPhoneAlt className="inline mr-2" /> Contact
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 rounded-l-lg py-3 px-4 bg-gray-100"
              >
                <option value="+254">+254 (KE)</option>
                <option value="+255">+255 (TZ)</option>
                <option value="+256">+256 (UG)</option>
              </select>
              <input
                type="text"
                name="contact"
                placeholder="123456789"
                value={formData.contact}
                onChange={handleChange}
                required
                className="flex-1 border border-gray-300 rounded-r-lg py-3 px-4 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            {/* Password */}
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 mb-2">
                <FaLock className="inline mr-2" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.password ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg py-3 pl-3 pr-10 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPasswords((prev) => ({ ...prev, password: !prev.password }))}
                >
                  {showPasswords.password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {/* Confirm Password */}
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 mb-2">
                <FaLock className="inline mr-2" /> Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg py-3 pl-3 pr-10 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      confirmPassword: !prev.confirmPassword,
                    }))
                  }
                >
                  {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg py-3 hover:from-blue-600 hover:to-indigo-600 transition ease-in-out duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline"
          >
            Already have an account? Log In
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

export default RegisterOverlay;
