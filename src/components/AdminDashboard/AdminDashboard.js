// src/pages/AdminDashboard.js
// integrate the sidebar and the content area. The routes for the various pages will be included within this component.
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../AdminDashboard/AdminSidebar'; // Update with the correct path
import AdminUsers from './AdminUserMgmnt'; // Path to your AdminUserMgmnt component
import AdminOrders from './AdminOrders'; // Path to your AdminOrders component
import AdminSettings from './AdminSettings'; // Path to your AdminSettings component
import AdminServices from './AdminServices'; // Path to your AdminServices component
import AdminDashboardHome from '../'; // Optional Home component for Dashboard

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 p-6"> {/* Ensure ml-64 to offset sidebar */}
        <Routes>
          <Route path="/" element={<AdminDashboardHome />} /> {/* Optional: Default landing page for Admin */}
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="admin-orders" element={<AdminOrders />} />
          <Route path="admin-settings" element={<AdminSettings />} />
          <Route path="admin-services" element={<AdminServices />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;