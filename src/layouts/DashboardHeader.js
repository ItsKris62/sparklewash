import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaShoppingCart, FaStar } from 'react-icons/fa'; // Import icons

const DashboardHeader = ({ totalOrders, points, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Execute logout function
    navigate('/home'); // Navigate to Home page
  };

  return (
    <div className="p-8 bg-gradient-to-r from-[#004080] to-blue-700 text-white rounded-lg shadow-lg mb-8 relative">
      <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all hover:bg-red-700"
      >
        <FaSignOutAlt size={18} />
        Logout
      </button>

      {/* Stats Cards */}
      <div className="flex space-x-6 mt-6">
        
        {/* Card for Total Orders */}
        <div className="bg-white text-navy p-6 rounded-lg shadow-md flex-1 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-yellow-400">{totalOrders}</p>
          </div>
          <FaShoppingCart className="text-blue-600 text-4xl" />
        </div>

        {/* Card for Total Points */}
        <div className="bg-white text-navy p-6 rounded-lg shadow-md flex-1 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Points Gained</h3>
            <p className="text-3xl font-bold text-yellow-400">{points}</p>
          </div>
          <FaStar className="text-blue-600 text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
