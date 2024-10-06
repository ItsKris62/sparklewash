import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DashboardHeader = ({ totalOrders, points, onLogout }) => {
  const navigate = useNavigate(); // Use navigate to redirect

  const handleOrdersClick = () => {
    navigate('/orders'); // Redirect to orders page (you will need to create this route and component)
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg mb-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl mb-2">Total Orders: <span className="font-semibold text-yellow-300">{totalOrders}</span></p>
          <p className="text-xl">Points Gained: <span className="font-semibold text-yellow-300">{points}</span></p>
        </div>
        <div className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-md">
          <p className="text-lg font-bold">Keep it up!</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleOrdersClick}
          className="bg-white text-blue-600 font-bold py-2 px-4 rounded mr-2"
        >
          Go to Orders
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;