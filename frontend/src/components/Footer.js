// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="bg-white bg-opacity-50 backdrop-blur-lg text-navyBlue font-lato p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>© 2024 Cleanslate. All rights reserved.</p>
        <p>Follow us on:
          <a href="https://facebook.com" className="ml-2 hover:text-brightYellow">Facebook</a>,
          <a href="https://twitter.com" className="ml-2 hover:text-brightYellow">Twitter</a>,
          <a href="https://instagram.com" className="ml-2 hover:text-brightYellow">Instagram</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
