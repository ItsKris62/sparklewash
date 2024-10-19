// src/ui/CardHeader.js
import React from 'react';

const CardHeader = ({ children, className }) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export default CardHeader;