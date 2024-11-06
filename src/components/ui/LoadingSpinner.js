import React from 'react';
import './LoadingSpinner.css'; // Importing custom CSS for animations

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="washing-machine">
      <div className="drum">
        <div className="water">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
