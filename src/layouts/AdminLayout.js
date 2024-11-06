// src/layouts/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminDashboard/AdminSidebar';
import AdminNavbar from '../components/AdminDashboard/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen bg-gray-100 ml-64">
        <AdminNavbar />
        <main className="p-6 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
