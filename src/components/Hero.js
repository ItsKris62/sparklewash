import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/images/washing-machine-2668472.jpg';

const Hero = () => {
  const navigate = useNavigate();
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewServices = () => {
    navigate('/services');
  };

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        transform: `translateY(${offsetY * 0.2}px)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

      {/* Hero Content */}
      <div className="relative flex items-center justify-center h-full text-center text-[#FFD700] z-20 px-4">
        <div
          className="transition-transform duration-700 ease-out"
          style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 transform transition-all duration-500 hover:scale-105">
            Welcome to <span className="text-white">Clean Slate</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 opacity-90 hover:opacity-100 transition-opacity duration-500">
            Experience the ultimate in laundry and dry cleaning services – convenience at your fingertips.
          </p>
          <button
            onClick={handleViewServices}
            className="relative inline-flex items-center px-6 py-3 text-lg font-semibold text-navy bg-[#FFD700] rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-white hover:text-[#FFD700] shadow-xl overflow-hidden group"
          >
            <span className="relative z-10">View Our Services</span>
            <span className="absolute inset-0 w-full h-full bg-white rounded-full transform scale-0 transition-transform duration-500 ease-in-out group-hover:scale-150"></span>
            <svg
              className="w-6 h-6 ml-3 transition-transform duration-500 ease-in-out transform group-hover:translate-x-2 group-hover:rotate-45"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13 2L3 12h7v8h8v-8h7L13 2z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
