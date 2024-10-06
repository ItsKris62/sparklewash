import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo_-_white-removebg-preview.png'; 

const SideNav = ({ userName }) => {
  return (
    <div className="bg-navy text-white w-64 h-full p-6 shadow-lg">
      <div className="flex items-center mb-8">
        <img src={logo} alt="Logo" className="h-12 w-12 mr-3" />
        <p className="text-xl font-bold">{userName}</p>
      </div>
      
      <nav>
        <ul>
          <li>
            <Link to="/user-dashboard" className="block py-3 text-lg hover:bg-blue-600 rounded-md transition-all duration-300">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/orders" className="block py-3 text-lg hover:bg-blue-600 rounded-md transition-all duration-300">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block py-3 text-lg hover:bg-blue-600 rounded-md transition-all duration-300">
              Profile Management
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
