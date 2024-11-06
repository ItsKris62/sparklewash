import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginOverlay from '../components/LoginOverlay';
import RegisterOverlay from '../components/RegisterOverlay'; // Import the RegisterOverlay
import Logo from '../assets/images/logoTRANS.png';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const handleCloseOverlays = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-90 backdrop-blur-lg shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <img src={Logo} alt="Clean Slate Logo" className="h-10 w-10 mr-3" />
            <h1 className="text-3xl font-playwrite text-navy hover:text-yellow-500 transition-colors">
              Clean Slate
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-lg text-navy hover:text-yellow-500 transition-colors">Home</Link>
            <Link to="/services" className="text-lg text-navy hover:text-yellow-500 transition-colors">Services</Link>
          </nav>
          <button
            onClick={handleLoginClick}
            className="flex items-center space-x-2 text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-all"
          >
            <FaUserCircle className="text-xl" />
            <span>Login</span>
          </button>
        </div>
      </header>
      <LoginOverlay 
        isOpen={isLoginOpen} 
        onClose={handleCloseOverlays} 
        onSwitchToRegister={handleRegisterClick} // Pass the switch function
      />
      <RegisterOverlay 
        isOpen={isRegisterOpen} 
        onClose={handleCloseOverlays} 
        onSwitchToLogin={handleLoginClick} // Pass the switch function
      />
    </>
  );
};

export default Header;
