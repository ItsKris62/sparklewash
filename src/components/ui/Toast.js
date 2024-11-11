// src/ui/Toast.js
import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto-close after 4 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  // Define styles and icons based on the toast type
  const styles = {
    success: {
      icon: <FaCheckCircle className="text-green-500 text-2xl" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-700',
    },
    error: {
      icon: <FaExclamationCircle className="text-red-500 text-2xl" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-700',
    },
    info: {
      icon: <FaInfoCircle className="text-blue-500 text-2xl" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-700',
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-xs w-full rounded-lg shadow-lg border-l-4 p-4 
        ${currentStyle.bgColor} ${currentStyle.borderColor} ${currentStyle.textColor} 
        animate-slide-in transition-transform transform scale-105`}
      role="alert"
    >
      <div className="flex items-start">
        {currentStyle.icon}
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Toast;
