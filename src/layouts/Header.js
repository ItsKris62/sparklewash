import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginOverlay from '../components/LoginOverlay';
import RegisterOverlay from '../components/RegisterOverlay';
import Logo from '../assets/images/logoTRANS.png'; // Make sure to import your logo image

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-20 bg-white bg-opacity-70 backdrop-blur-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <img src={Logo} alt="Clean Slate Logo" className="h-16 w-16 mr-3" />
            <h1 className="text-navy font-bold text-2xl transition-colors duration-300 hover:text-yellow-500">
              Clean Slate
            </h1>
          </div>
          <nav className="space-x-4">
            <Link to="/" className="text-navy hover:text-[#FFD700] transition-all duration-300 rounded-md p-2 border border-transparent hover:border-[#FFD700]">
              Home
            </Link>
            <Link to="/services" className="text-navy hover:text-[#FFD700] transition-all duration-300 rounded-md p-2 border border-transparent hover:border-[#FFD700]">
              Services
            </Link>
          </nav>
          <div className="flex space-x-4">
            <button
              className="relative px-8 rounded-full bg-yellow-500 isolation-auto z-10 border-2 border-navy before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-yellow-500 before:-right-full before:hover:right-0 before:rounded-full before:bg-navy before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center py-3 text-sm font-semibold text-black bg-white border border-gray-200 shadow-sm gap-x-2"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="relative px-8 py-2 rounded-full bg-yellow-500 isolation-auto z-10 border-2 border-navy before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-yellow-500 before:-right-full before:hover:right-0 before:rounded-full before:bg-navy before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold text-black bg-white border border-gray-200 shadow-sm gap-x-2"
              onClick={handleRegisterClick}
            >
              Signup
            </button>
          </div>
        </div>
      </header>

      {/* Render Login and Register Overlay */}
      <LoginOverlay isOpen={isLoginOpen} onClose={handleCloseLogin} />
      <RegisterOverlay isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </>
  );
};

export default Header;
