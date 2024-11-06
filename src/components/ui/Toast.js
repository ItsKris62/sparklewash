// src/ui/Toast.js

import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Automatically close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-2xl" />;
      case 'error':
        return <FaExclamationCircle className="text-red-500 text-2xl" />;
      case 'info':
      default:
        return <FaTimesCircle className="text-blue-500 text-2xl" />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-xs w-full rounded-lg shadow-lg bg-white border p-4 
      transition-transform transform ${type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-blue-500'}
      scale-105 animate-fadeIn`}
    >
      <div className="flex items-center">
        {getIcon()}
        <div className="ml-3 flex-grow">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
