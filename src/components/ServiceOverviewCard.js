// src/components/ServiceOverviewCard.js
import React from 'react';
import { FaConciergeBell, FaTshirt, FaBroom, FaCar, FaUtensils, FaSpa } from 'react-icons/fa';

// Define a mapping of service names to icons
const serviceIcons = {
  'Laundry Services': <FaTshirt className="text-blue-700 text-4xl mr-4" />,
  'Dry Cleaning Services': <FaConciergeBell className="text-green-700 text-4xl mr-4" />,
  'Carpet Cleaning Services': <FaBroom className="text-orange-700 text-4xl mr-4" />,
  'Airbnb Cleaning Services': <FaCar className="text-purple-700 text-4xl mr-4" />,
  'Meal Prep Services': <FaUtensils className="text-yellow-700 text-4xl mr-4" />,
  'Landscaping Services': <FaSpa className="text-red-700 text-4xl mr-4" />,
};

const ServiceOverviewCard = ({ serviceName, revenue }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-lg flex items-center">
      {/* Display corresponding icon or a default icon */}
      {serviceIcons[serviceName] || <FaConciergeBell className="text-gray-700 text-4xl mr-4" />}
      <div className="text-center flex-1">
        <h3 className="text-lg font-medium text-gray-600">{serviceName}</h3>
        <p className="text-2xl font-bold text-blue-700">${revenue.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ServiceOverviewCard;
