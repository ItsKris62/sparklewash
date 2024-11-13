import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginOverlay from '../components/LoginOverlay';
import RegisterOverlay from '../components/RegisterOverlay';
import Logo from '../assets/images/logoTRANS.png';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsMenuOpen(false); // Close menu if open
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsMenuOpen(false); // Close menu if open
  };

  const handleCloseOverlays = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-20 bg-white bg-opacity-70 backdrop-blur-lg shadow-lg rounded-xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between transition-all duration-300">
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Clean Slate Logo" className="h-10 w-10 rounded-lg" />
          <Link to="/" className="text-2xl font-semibold font-playwrite text-navy hover:text-yellow-500 transition-colors">
            Clean Slate
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-lg text-navy hover:text-yellow-500 transition-colors">Home</Link>
          <Link to="/services" className="text-lg text-navy hover:text-yellow-500 transition-colors">Services</Link>
          <button
            onClick={handleLoginClick}
            className="flex items-center space-x-2 text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
            aria-label="Login"
          >
            <FaUserCircle className="text-xl" />
            <span>Login</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-navy focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-10 p-4 flex flex-col space-y-4 text-center md:hidden">
            <Link to="/" onClick={toggleMenu} className="text-lg text-navy hover:text-yellow-500 transition-colors">Home</Link>
            <Link to="/services" onClick={toggleMenu} className="text-lg text-navy hover:text-yellow-500 transition-colors">Services</Link>
            <button
              onClick={handleLoginClick}
              className="flex items-center justify-center space-x-2 text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-all w-full"
              aria-label="Login"
            >
              <FaUserCircle className="text-xl" />
              <span>Login</span>
            </button>
          </div>
        )}
      </header>

      {/* Login and Register Overlays */}
      <LoginOverlay 
        isOpen={isLoginOpen} 
        onClose={handleCloseOverlays} 
        onSwitchToRegister={handleRegisterClick}
      />
      <RegisterOverlay 
        isOpen={isRegisterOpen} 
        onClose={handleCloseOverlays} 
        onSwitchToLogin={handleLoginClick}
      />
    </>
  );
};

export default Header;
