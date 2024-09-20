// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-transparent text-white font-montserrat z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cleanslate</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#home" className="hover:text-brightYellow">Home</a></li>
            <li><a href="#services" className="hover:text-brightYellow">Services</a></li>
            <li><a href="#about" className="hover:text-brightYellow">About</a></li>
            <li><a href="#contact" className="hover:text-brightYellow">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
