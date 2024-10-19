// src/ui/CardTitle.js
import React from 'react';

const CardTitle = ({ children, className }) => {
  return (
    <h2 className={`text-lg font-semibold ${className}`}>
      {children}
    </h2>
  );
};

export default CardTitle;