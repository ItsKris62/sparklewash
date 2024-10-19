import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo2trans.png'; 
import { FaTachometerAlt, FaClipboardList, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Import Font Awesome icons

const SideNav = ({ userName, onLogout }) => {
  return (
    <div className="fixed left-0 top-0 bg-gradient-to-b from-blue-800 to-blue-600 text-white w-64 h-full p-6 shadow-lg flex flex-col justify-between">
      {/* Logo and Username */}
      <div>
        <div className="flex items-center mb-8">
          <img src={logo} alt="Logo" className="h-12 w-12 mr-3" />
          <p className="text-xl font-bold">{userName}</p>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/user-dashboard" className="block py-3 text-lg hover:bg-blue-700 text-[#FFD700] rounded-md transition-all duration-300 flex items-center">
                <FaTachometerAlt className="mr-2" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/orders" className="block py-3 text-lg hover:bg-[#FFD700] text-white rounded-md transition-all duration-300 flex items-center">
                <FaClipboardList className="mr-2" />
                Orders
              </Link>
            </li>
            <li>
              <Link to="/profile" className="block py-3 text-lg hover:bg-[#FFD700] text-white rounded-md transition-all duration-300 flex items-center">
                <FaUserCircle className="mr-2" />
                Profile Management
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all hover:bg-red-700"
      >
        <FaSignOutAlt size={18} />
        Logout
      </button>
    </div>
  );
};

export default SideNav;