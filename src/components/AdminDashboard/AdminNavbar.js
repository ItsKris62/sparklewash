import React, { useState, useRef, useEffect } from 'react';

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    { id: 1, message: 'New order received: Order #1234' },
    { id: 2, message: 'Order #5678 status updated to shipped' },
    { id: 3, message: 'New plugin version available' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-900 text-white fixed top-0 left-0 z-30">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="flex items-center space-x-4">
        <div className="relative text-gray-600">
          <input
            type="search"
            name="search"
            placeholder="Search"
            className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg
              className="h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm8.707-1.707l-3.386-3.387a1 1 0 10-1.414 1.415l3.387 3.386a1 1 0 001.414-1.414z" />
            </svg>
          </button>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className="bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.6 14.6V11a7.003 7.003 0 00-5-6.708V3a2 2 0 10-4 0v1.292A7.003 7.003 0 004 11v3.6c0 .523-.214 1.025-.595 1.395L2 17h5m8 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <li key={notification.id} className="p-2 border-b hover:bg-gray-100">
                      {notification.message}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No notifications</li>
                )}
              </ul>
            </div>
          )}

          <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-600 rounded-full" />
        </div>

        <div className="flex items-center space-x-2">
          <span>Admin</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Admin Avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;