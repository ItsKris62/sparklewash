import React, { useState, useEffect } from 'react';
import SideNav from '../layouts/SideNav';
import { useAuth } from '../components/context/AuthContext'; // Use AuthContext instead

const ProfileManagement = () => {
  const { user, setUser } = useAuth(); // Get the user from AuthContext
  const [userData, setUserData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    contact: user.contact || '',
    location: user.location || '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    setUserData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      contact: user.contact || '',
      location: user.location || '',
      password: '',
    });
  }, [user]);

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
    if (deleteConfirmation === 'DELETE') {
      alert('Account deleted');
      setUser({});
      localStorage.removeItem('token');
      window.location.href = '/'; // Redirect to Home
      setShowDeleteConfirm(false);
    } else {
      alert('Please type "DELETE" to confirm account deletion.');
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated');
    setIsEditing(false);

    setUser({
      ...user,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      contact: userData.contact,
      location: userData.location,
    });
  };

  return (
    <div className="flex min-h-screen">
      <SideNav userFirstName={user.firstName} userLastName={user.lastName} />
      <div className="p-8 ml-64 bg-gray-50 w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Profile Management</h2>
        <form onSubmit={handleUpdate} className="space-y-6 max-w-lg mx-auto">
          <div>
            <label className="block text-lg font-semibold mb-1">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={userData.firstName}
              disabled // Non-editable
              className="w-full p-3 border rounded-md bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={userData.lastName}
              disabled // Non-editable
              className="w-full p-3 border rounded-md bg-gray-200"
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
            <label className="block text-lg font-semibold mb-1">Contact</label>
            <input 
              type="text" 
              name="contact" 
              value={userData.contact}
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

          <div>
            <label className="block text-lg font-semibold mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={userData.password}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-3 border rounded-md ${isEditing ? 'border-blue-500' : 'bg-gray-200'}`}
              placeholder="Enter new password"
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
                Update Profile
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
              <h3 className="text-xl font-bold mb-4">Confirm Account Deletion</h3>
              <p className="mb-4">Please type "DELETE" to confirm account deletion.</p>
              <input 
                type="text" 
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full p-2 border rounded-md mb-4"
              />
              <div className="flex space-x-4">
                <button 
                  onClick={handleDeleteAccount} 
                  className="px-6 py-2 bg-red-600 text-white rounded-md"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteConfirmation('');
                  }} 
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
