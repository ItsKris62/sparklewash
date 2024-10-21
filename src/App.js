import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import UserDashboard from './pages/UserDashboard';
import Orders from './pages/OrderPage';
import ProfileManagement from './pages/ProfileManagement';
import AdminDashboard from './pages/AdminDashboard'; 
import Footer from './layouts/Footer'; // Footer for non-dashboard pages

import AdminUsers from './components/AdminDashboard/AdminUsers'; 
import AdminOrders from './components/AdminDashboard/AdminOrders'; 
import AdminSettings from './components/AdminDashboard/AdminSettings';
import AdminServices from './components/AdminDashboard/AdminServices'; 
import AdminAnalytics from './components/AdminDashboard/AdminAnalytics'; // Import Analytics
import AdminLogs from './components/AdminDashboard/AdminLogs'; // Import Logs
import AdminReports from './components/AdminDashboard/AdminReports'; // Import Reports 
import Dashboard from './components/AdminDashboard/Dashboard'; // Import Dashboard

function App() {
  const location = useLocation();

  // Define routes for user and admin dashboards
  const isUserDashboard = location.pathname.startsWith('/user-dashboard');
  const isAdminDashboard = location.pathname.startsWith('/admin-dashboard');

  return (
    <div className="App">
      {/* Conditionally render routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<ProfileManagement />} />

        {/* Admin dashboard routes */}
        <Route path="/admin-dashboard/*" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} /> {/* Default landing page for Admin */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="logs" element={<AdminLogs />} />
          <Route path="reports" element={<AdminReports />} />
          {/* Add any other admin routes here */}
        </Route>
      </Routes>

      {/* Conditionally render the footer */}
      {!isUserDashboard && !isAdminDashboard && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;