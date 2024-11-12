import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo2trans.png';
import { FaTachometerAlt, FaClipboardList, FaUserCircle, FaSignOutAlt, FaTruck  } from 'react-icons/fa';
import { useAuth } from '../components/context/AuthContext';

/**
 * Improved Side Navigation Bar with enhanced UI/UX design.
 * Features include better hover effects, responsive design, and smoother animations.
 * @returns {JSX.Element} The improved side navigation bar component.
 */
const SideNav = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 w-64 md:w-56 h-full bg-gradient-to-b from-gray-100 to-gray-300 shadow-xl flex flex-col justify-between p-6 z-50 transition-transform duration-300 transform md:translate-x-0">
      {/* Logo and User Information */}
      <div className="flex flex-col items-center mb-6">
        <img src={logo} alt="Logo" className="h-20 w-20 mb-4" />
        <div className="text-lg font-semibold text-center text-gray-700 truncate">
          {`${user?.firstName || 'User'} ${user?.lastName || ''}`}
        </div>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-[#FFD700] hover:text-navy rounded-md transition duration-300"
            >
              <FaTachometerAlt className="mr-3 text-xl" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/orders"
              className="flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-[#FFD700] hover:text-navy rounded-md transition duration-300"
            >
              <FaClipboardList className="mr-3 text-xl" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/order-tracking"
              className="flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-[#FFD700] hover:text-navy rounded-md transition duration-300"
            >
              <FaTruck className="mr-3 text-xl" />
              <span>Order Tracking</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/profile"
              className="flex items-center py-3 px-4 text-lg text-gray-700 hover:bg-[#FFD700] hover:text-navy rounded-md transition duration-300"
            >
              <FaUserCircle className="mr-3 text-xl" />
              <span>My Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          <FaSignOutAlt size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideNav;
