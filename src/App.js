import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './layouts/Header';
import DashboardHeader from './layouts/DashboardHeader'; // Import your DashboardHeader
import Home from './pages/Home';
import Footer from './layouts/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import UserDashboard from './pages/UserDashboard';
import Orders from './pages/OrderPage'; // Import the Orders page
import ProfileManagement from './pages/ProfileManagement'; // Import the ProfileManagement page
import SideNav from './layouts/SideNav';
import './App.css';

function App() {
  const location = useLocation(); // Get current location

  // Define routes where the DashboardHeader should be used
  const dashboardRoutes = ['/user-dashboard', '/orders', '/profile'];

  return (
    <div className="App">
      {/* Conditionally render the DashboardHeader for authenticated dashboard-related routes */}
      {dashboardRoutes.includes(location.pathname) ? <DashboardHeader /> : <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<ProfileManagement />} /> {/* Add the ProfileManagement route */}
        
        {/* Add more routes as needed */}
      </Routes>

      {/* Conditionally render Footer only on non-dashboard pages */}
      {!dashboardRoutes.includes(location.pathname) && <Footer />}
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
