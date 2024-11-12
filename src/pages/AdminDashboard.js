// src/pages/AdminDashboard.js

import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/AdminDashboard/Dashboard';
import AdminOrders from '../components/AdminDashboard/AdminOrders';
import AdminSettings from '../components/AdminDashboard/AdminSettings';
import AdminServices from '../components/AdminDashboard/AdminServices';
import AdminAnalytics from '../components/AdminDashboard/AdminAnalytics';
import AdminLogs from '../components/AdminDashboard/AdminLogs';
import AdminUsers from '../components/AdminDashboard/AdminUsers';
import AdminReports from '../components/AdminDashboard/AdminReports';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col flex-1 p-4 overflow-auto mt-16">
      {/* Main Routes only, layout handled by AdminLayout */}
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="logs" element={<AdminLogs />} />
        <Route path="reports" element={<AdminReports />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
