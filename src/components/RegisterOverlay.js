import React from 'react';

const RegisterOverlay = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`} style={{ zIndex: 40 }}>
      <div className="bg-white rounded-lg p-8 shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input type="password" className="w-full border border-gray-300 rounded-lg p-2" required />
          </div>
          <button type="submit" className="w-full bg-navy text-white rounded-lg py-2">Sign Up</button>
        </form>
        <button className="text-blue-500 mt-4" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterOverlay;
