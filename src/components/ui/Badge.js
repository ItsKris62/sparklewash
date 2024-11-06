// src/components/ui/Badge.js

import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ label, color = 'bg-blue-500', textColor = 'text-white', className = '' }) => (
  <span className={`${color} ${textColor} inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
    {label}
  </span>
);

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default Badge;
