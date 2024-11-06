// src/components/ui/Button.js

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon = null,
  isLoading = false,
  disabled = false,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded focus:outline-none transition duration-150 ease-in-out';
  
  const variants = {
    primary: 'bg-navy text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
    link: 'text-blue-500 underline hover:text-blue-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  const iconSize = {
    sm: 'mr-1',
    md: 'mr-2',
    lg: 'mr-3',
  };

  const buttonStyles = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <button
      ref={ref}
      className={buttonStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin mr-2" />
      ) : (
        Icon && <Icon className={iconSize[size]} />
      )}
      {children}
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'link', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  icon: PropTypes.elementType,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.displayName = 'Button';

export default Button;
