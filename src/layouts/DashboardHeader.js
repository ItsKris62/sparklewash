import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ totalOrders, points, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Execute logout function
    navigate('Home'); // Navigate to Home page
  };

  return (
    <div className="p-8 bg-gradient-to-r from-navy to-blue-700 text-white rounded-lg shadow-md mb-8 relative">
      <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>
      
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all hover:bg-red-700"
      >
        Logout
      </button>

      <div className="flex space-x-4 mt-4">
        {/* Card for Total Orders */}
        <div className="bg-white text-blue-600 p-4 rounded-lg shadow-md w-1/2">
          <h3 className="text-lg font-bold mb-2">Total Orders</h3>
          <p className="text-2xl font-semibold text-yellow-300">{totalOrders}</p>
        </div>

        {/* Card for Total Points */}
        <div className="bg-white text-blue-600 p-4 rounded-lg shadow-md w-1/2">
          <h3 className="text-lg font-bold mb-2">Points Gained</h3>
          <p className="text-2xl font-semibold text-yellow-300">{points}</p>
        </div>
      </div>

    </div>
  );
};

export default DashboardHeader;