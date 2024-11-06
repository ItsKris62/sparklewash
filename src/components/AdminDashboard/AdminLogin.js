import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft, FaHome, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import Toast from '../ui/Toast'; // Custom Toast component

const AdminLogin = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toastConfig, setToastConfig] = useState(null);

  const showToast = (message, type) => {
    setToastConfig({ message, type });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    try {
      await adminLogin(email, password);
      showToast('Admin login successful!', 'success');
      setTimeout(() => navigate('/admin-dashboard'), 1000); // Navigate after a short delay
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showToast('Incorrect email or password', 'error');
      } else if (error.response && error.response.status === 404) {
        showToast('User not found', 'error');
      } else {
        showToast('Admin login failed. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-[#004080] to-[#005f8e]">
      <button className="absolute top-5 left-5 text-white hover:text-gray-300" onClick={handleBack}>
        <FaArrowLeft size={20} />
      </button>

      <h1 className="text-4xl font-bold text-white mb-5">Admin Login</h1>

      <form className="bg-white shadow-lg rounded-lg px-10 pt-8 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="relative mb-6">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400 transition-all duration-200" />
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className="peer shadow appearance-none border rounded w-full py-3 pl-10 pr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#005f8e]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-3 text-gray-400 transition-all duration-200" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="peer shadow appearance-none border rounded w-full py-3 pl-10 pr-12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-[#005f8e]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button 
          type="submit" 
          className="bg-[#004080] hover:bg-[#005f8e] text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition duration-300"
        >
          Login
        </button>

        <div className="flex justify-center mt-4">
          <Link to="/" className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-indigo-600 transition ease-in-out duration-300">
            <FaHome className="mr-2" />
            Back to Home
          </Link>
        </div>
      </form>

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

export default AdminLogin;
