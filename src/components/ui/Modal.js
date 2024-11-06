// src/components/ui/Modal.js

import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  size = 'md', 
  showCloseIcon = true,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      
      {/* Modal container */}
      <div className={`relative bg-white rounded-lg shadow-lg p-6 ${sizeClasses[size]} w-full z-10 mx-4`}>
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
            {showCloseIcon && (
              <button
                className="text-gray-500 hover:text-red-500 text-2xl focus:outline-none"
                onClick={onClose}
              >
                &times;
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="mb-4">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2">
          {/* Default buttons if no custom footer is provided */}
          {footer ? (
            footer
          ) : (
            <>
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button variant="primary" onClick={onConfirm}>Confirm</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,       // Custom footer
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  showCloseIcon: PropTypes.bool, // Show close button in header
  onConfirm: PropTypes.func,     // Optional confirm callback
};

export default Modal;
