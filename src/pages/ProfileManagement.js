import React, { useState } from 'react';
import SideNav from '../layouts/SideNav';

const ProfileManagement = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    location: 'New York, USA',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteAccount = () => {
    // Logic to delete account goes here
    alert('Account deleted');
    setShowDeleteConfirm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Logic to update the user's data
    alert('Profile updated');
    setIsEditing(false);
  };

  return (
    <div className="flex min-h-screen">
      <SideNav userName="John Doe" /> {/* SideNav here */}
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Profile Management</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold mb-1">Name</label>
          <input 
            type="text" 
            name="name" 
            value={userData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-md ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            value={userData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-md ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">Phone</label>
          <input 
            type="text" 
            name="phone" 
            value={userData.phone}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-md ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">Location</label>
          <input 
            type="text" 
            name="location" 
            value={userData.location}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`w-full p-3 border rounded-md ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
          />
        </div>

        <div className="flex space-x-4">
          {isEditing ? (
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-white rounded-md"
            >
              Save Changes
            </button>
          ) : (
            <button 
              type="button" 
              onClick={handleEditToggle}
              className="px-6 py-2 bg-yellow-500 text-white rounded-md"
            >
              Edit Profile
            </button>
          )}
          <button 
            type="button" 
            onClick={() => setShowDeleteConfirm(true)}
            className="px-6 py-2 bg-red-600 text-white rounded-md"
          >
            Delete Account
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-4">Are you sure you want to delete your account?</h3>
            <div className="flex space-x-4">
              <button 
                onClick={handleDeleteAccount} 
                className="px-6 py-2 bg-red-600 text-white rounded-md"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(false)} 
                className="px-6 py-2 bg-gray-600 text-white rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProfileManagement;
