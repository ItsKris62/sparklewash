import React from 'react';
import { MdPeople, MdShoppingCart, MdAttachMoney, MdPerson } from 'react-icons/md';
import { FaService } from 'react-icons/fa';

const AdminAnalytics = () => {
  // Static data for analytics
  const analyticsData = {
    totalUsers: 1200,
    totalOrders: 4500,
    monthlyRevenue: "$30,000",
    activeUsers: 900,
    topServices: ["Laundry", "Dry Cleaning", "Carpet Cleaning"],
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg shadow-lg flex items-center">
          <MdPeople className="text-blue-700 text-4xl mr-4" />
          <div className="text-center flex-1">
            <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
            <p className="text-2xl font-bold text-blue-700">{analyticsData.totalUsers}</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-lg flex items-center">
          <MdShoppingCart className="text-green-700 text-4xl mr-4" />
          <div className="text-center flex-1">
            <h3 className="text-lg font-medium text-gray-600">Total Orders</h3>
            <p className="text-2xl font-bold text-green-700">{analyticsData.totalOrders}</p>
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-lg flex items-center">
          <MdAttachMoney className="text-yellow-700 text-4xl mr-4" />
          <div className="text-center flex-1">
            <h3 className="text-lg font-medium text-gray-600">Monthly Revenue</h3>
            <p className="text-2xl font-bold text-yellow-700">{analyticsData.monthlyRevenue}</p>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow-lg flex items-center">
          <MdPerson className="text-red-700 text-4xl mr-4" />
          <div className="text-center flex-1">
            <h3 className="text-lg font-medium text-gray-600">Active Users</h3>
            <p className="text-2xl font-bold text-red-700">{analyticsData.activeUsers}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Top Services</h3>
        <ul className="list-disc list-inside pl-5 text-gray-600">
          {analyticsData.topServices.map((service, index) => (
            <li key={index} className="text-lg">{service}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAnalytics;