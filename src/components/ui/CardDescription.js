// src/ui/CardDescription.js
import React from 'react';

const CardDescription = ({ children, className }) => {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      {children}
    </p>
  );
};

export default CardDescription;