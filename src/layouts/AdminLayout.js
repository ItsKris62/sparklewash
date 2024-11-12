// src/layouts/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminDashboard/AdminSidebar';
import AdminNavbar from '../components/AdminDashboard/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100">
      {/* Sidebar remains fixed to the left */}
      <AdminSidebar />

      {/* Main content area with navbar and outlet */}
      <div className="flex flex-col flex-1 lg:ml-64 min-h-screen bg-gray-100"> 
        <AdminNavbar />
        <main className="p-6 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
