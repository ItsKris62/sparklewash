import React, { useState, useEffect } from 'react';
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

import './App.css';

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [points, setPoints] = useState(0);

  // Simulate fetching random figures
  useEffect(() => {
    // Simulate fetching data from a database
    const fetchData = async () => {
      // Uncomment the following lines to fetch data from your database
      // const response = await fetch('/api/user-data'); // Example fetch call
      // const data = await response.json();
      // setTotalOrders(data.totalOrders);
      // setPoints(data.points);
      
      // For now, use random figures
      setTotalOrders(Math.floor(Math.random() * 100)); // Random total orders
      setPoints(Math.floor(Math.random() * 500)); // Random points
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts.

  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log("Logged out."); // Add your actual logout logic here.
  };

  const dashboardRoutes = ['/user-dashboard', '/orders', '/profile'];

  return (
    <div className="App">
      {/* Show DashboardHeader if on a specified dashboard route, otherwise show Header */}
      {dashboardRoutes.includes(location.pathname) ? (
        <DashboardHeader 
          totalOrders={totalOrders} 
          points={points} 
          onLogout={handleLogout} 
        />
      ) : (
        <Header />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<ProfileManagement />} />
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
