// src/components/TopServices.js
import React, { useState } from 'react';
import { FaChartLine } from 'react-icons/fa';

const TopServices = ({ topServices, allServices }) => {
  const [expanded, setExpanded] = useState(false);

  // Toggle expanded view for all services
  const toggleViewAll = () => setExpanded(!expanded);

  // Determine services to display based on expanded state
  const displayedServices = expanded ? allServices : topServices;

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaChartLine className="text-blue-600 mr-2" /> Top Services
      </h3>

      <ul className="list-disc list-inside pl-5 text-gray-600">
        {displayedServices.map((service, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span className="text-lg font-medium">{service._id}</span>
            <span className="font-semibold text-blue-600">${service.revenue.toLocaleString()}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={toggleViewAll}
        className="mt-4 text-blue-600 font-semibold hover:underline"
      >
        {expanded ? 'Show Less' : 'View All Services'}
      </button>
    </div>
  );
};

export default TopServices;
