import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = ({ userName, onLogout }) => {
  return (
    <div className="bg-blue-900 text-white w-64 h-full p-6">
      <div className="flex items-center mb-8">
        <img src="../assets/images/Logo_Design-removebg.png" alt="Logo" className="h-12 w-12 mr-3" />
        <p className="text-xl font-bold">{userName}</p>
      </div>
      
      <nav>
        <ul>
          <li>
            <Link to="/user-dashboard" className="block py-3 text-lg hover:bg-blue-700 rounded-md transition duration-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/orders" className="block py-3 text-lg hover:bg-blue-700 rounded-md transition duration-200">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block py-3 text-lg hover:bg-blue-700 rounded-md transition duration-200">
              Profile Management
            </Link>
          </li>
          <li>
            <button 
              onClick={onLogout} 
              className="block w-full text-left py-3 text-lg hover:bg-red-600 rounded-md transition duration-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
