// Badge.js

import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ label, color = 'bg-blue-500', textColor = 'text-white' }) => {
  return (
    <span className={`${color} ${textColor} inline-flex items-center px-3 py-1 rounded-full text-sm font-medium`}>
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  textColor: PropTypes.string,
};

export default Badge;