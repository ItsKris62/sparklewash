import React from 'react';

const AdminNotifications = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul>
        <li className="mb-4">New Order Received</li>
        <li className="mb-4">New User Registered</li>
        <li className="mb-4">System Updated Successfully</li>
      </ul>
    </div>
  );
};

export default AdminNotifications;
