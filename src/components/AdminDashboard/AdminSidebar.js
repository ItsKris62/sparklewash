import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 md:translate-x-0">
      <div className="flex flex-col justify-between h-full px-4 py-6">
        
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-100">Admin Panel</h1>
          <hr className="border-gray-700 mt-3" />
        </div>
        
        {/* Menu Links */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition duration-200 ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaHome className="text-lg" />
                <span className="ml-4">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/users"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition duration-200 ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaUsers className="text-lg" />
                <span className="ml-4">Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/orders"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition duration-200 ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaTasks className="text-lg" />
                <span className="ml-4">Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/analytics"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition duration-200 ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaChartBar className="text-lg" />
                <span className="ml-4">Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/logs"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition duration-200 ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaClipboardList className="text-lg" />
                <span className="ml-4">Logs</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/reports"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition duration-200 ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaFileAlt className="text-lg" />
                <span className="ml-4">Reports</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin-dashboard/settings"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition duration-200 ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <FaCogs className="text-lg" />
                <span className="ml-4">Settings</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        
        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-3 text-red-500 bg-gray-800 rounded-lg hover:bg-red-600 hover:text-white transition duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="ml-4">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
