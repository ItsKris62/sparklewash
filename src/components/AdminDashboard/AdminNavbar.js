import React from 'react';

const AdminNavbar = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-900 text-white z-30">
      {/* Admin Dashboard Title */}
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Optional: You can add icons or additional features like notifications */}
      <div className="flex items-center space-x-4">
        {/* Search Bar (Optional) */}
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

        {/* Notification Icon */}
        <div className="relative">
          <button
            type="button"
            className="bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700"
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

          {/* Notification Count */}
          <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-600 rounded-full" />
        </div>

        {/* Admin Profile (Optional) */}
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
