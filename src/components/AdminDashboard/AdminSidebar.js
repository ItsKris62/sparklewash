import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaCogs,
  FaChartBar,
  FaClipboardList,
  FaFileAlt,
  FaSignOutAlt,
} from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-full fixed top-16 left-0 z-20"> {/* Adjusted top to 16 to align with fixed navbar */}
      <div className="flex flex-col justify-between h-full">
        {/* Menu Links */}
        <nav className="flex flex-col mt-2">
          <NavLink
            to="/admin-dashboard"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaHome className="text-xl mb-1" />
            <span className="ml-4">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/users"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaUsers className="text-xl mb-1" />
            <span className="ml-4">Users</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/orders"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaTasks className="text-xl mb-1" />
            <span className="ml-4">Orders</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/analytics"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaChartBar className="text-xl mb-1" />
            <span className="ml-4">Analytics</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/logs"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaClipboardList className="text-xl mb-1" />
            <span className="ml-4">Logs</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/reports"
            className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-300"
          >
            <FaFileAlt className="text-xl mb-1" />
            <span className="ml-4">Reports</span>
          </NavLink>

          <NavLink
            to="/admin-dashboard/settings"
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