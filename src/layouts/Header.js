import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-navy font-bold text-2xl transition-colors duration-300 hover:text-yellow-500">
          Clean Slate
        </h1>
        <nav className="space-x-4">
          <Link to="/" className="text-navy hover:text-yellow-500">
            Home
          </Link>
          <Link to="/services" className="text-navy hover:text-yellow-500">
            Services
          </Link>
          <Link to="/login" className="text-navy hover:text-yellow-500">
            Login
          </Link>
          <Link to="/register" className="text-navy hover:text-yellow-500">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
