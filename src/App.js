// src/App.js
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
import AdminUserMgmnt from './components/AdminDashboard/AdminUserMgmnt'; // Ensure this path is correct
import AdminOrders from './components/AdminDashboard/AdminOrders'; // Ensure this path is correct
import AdminSettings from './components/AdminDashboard/AdminSettings'; // Ensure this path is correct
import AdminServices from './components/AdminDashboard/AdminServices'; // Ensure this path is correct
import AdminDashboardHome from './pages/AdminDashboard'; // Optional landing component for admin dashboard

function App() {
  const location = useLocation();

  // Define routes for user and admin dashboards
  const userDashboardRoutes = ['/user-dashboard', '/orders', '/profile'];
  const adminDashboardRoutes = ['/admin-dashboard/*']; // Catch-all for admin dashboard

  const isUserDashboard = userDashboardRoutes.includes(location.pathname);
  const isAdminDashboard = adminDashboardRoutes.some(route => location.pathname.startsWith(route));

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
          <Route index element={<AdminDashboardHome />} /> {/* Optional: Default landing page for Admin */}
          <Route path="admin-users" element={<AdminUserMgmnt />} />
          <Route path="admin-orders" element={<AdminOrders />} />
          <Route path="admin-settings" element={<AdminSettings />} />
          <Route path="admin-services" element={<AdminServices />} />
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