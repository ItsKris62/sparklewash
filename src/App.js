import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layouts/Header';
import Home from './pages/Home';
import Footer from './layouts/Footer';
import Login from './pages/Login'; // Import your Login page
import Register from './pages/Register'; // Import your Register page
import Services from './pages/Services'; // Import your Services page
import UserDashboard from './pages/UserDashboard'; // Import your User Dashboard page
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
