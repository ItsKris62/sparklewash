import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaCogs,
  FaSignOutAlt,
} from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-full fixed top-0 left-0 z-20">
      <div className="flex flex-col justify-between h-full">
        {/* Menu Links */}
        <nav className="flex flex-col mt-10"> {/* Adjusted margin-top for extra space below the navbar */}
          <NavLink
            to="/admin/dashboard"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaHome className="text-xl mb-1" /> {/* Increased icon size and added bottom margin */}
            <span className="ml-4">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaUsers className="text-xl mb-1" />
            <span className="ml-4">Users</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaTasks className="text-xl mb-1" />
            <span className="ml-4">Orders</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaCogs className="text-xl mb-1" />
            <span className="ml-4">Settings</span>
          </NavLink>
        </nav>

        {/* Logout Button */}
        <NavLink
          to="/logout"
          className="flex items-center p-4 hover:bg-red-600 transition-colors duration-300 mb-4"
        >
          <FaSignOutAlt className="text-xl mb-1" />
          <span className="ml-4">Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;