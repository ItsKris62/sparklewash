// src/pages/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A React component for a 404 page.
 *
 * This component renders a 404 page with a cute design, a link to go back to the home page, and some decorative elements.
 *
 * @returns {JSX.Element} The NotFoundPage component.
 */
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 text-gray-800 p-4">
      <div className="flex flex-col items-center space-y-4 animate-bounce-slow">
        <h1 className="text-8xl font-extrabold text-blue-500">404</h1>
        <p className="text-2xl font-semibold text-gray-700 text-center">
          Oops! The page you're looking for isn't here.
        </p>
      </div>

      <p className="mt-4 text-gray-600 text-center max-w-md">
        It seems that you've hit a dead end. Don't worry, we’ll help you find your way back.
      </p>

      <Link
        to="/"
        className="mt-8 px-6 py-3 rounded-full bg-blue-600 text-white text-lg font-medium transition duration-300 ease-in-out hover:bg-blue-700 shadow-md hover:shadow-xl"
      >
        Go Back to Home
      </Link>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 bg-blue-300 w-24 h-24 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute top-20 right-20 bg-blue-500 w-16 h-16 rounded-full opacity-20 animate-pulse-slow"></div>
    </div>
  );
};

export default NotFoundPage;
