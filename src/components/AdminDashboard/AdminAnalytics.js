// src/pages/AdminAnalytics.js
import React, { useState, useEffect, useCallback } from 'react';
import { MdPeople, MdShoppingCart, MdAttachMoney, MdPerson } from 'react-icons/md';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ServiceOverviewCard from '../ui/ServiceOverviewCard';

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    activeUsers: 0,
    allServicesRevenue: [],
  });
  const { user } = useAuth();

  // Fetch analytics data function
  const fetchAnalyticsData = useCallback(async () => {
    try {
      const response = await axios.get('/api/analytics', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  }, [user.token]);

  useEffect(() => {
    fetchAnalyticsData();
    const intervalId = setInterval(fetchAnalyticsData, 30000); // 30 seconds
    return () => clearInterval(intervalId);
  }, [fetchAnalyticsData]);

  if (!analyticsData) {
    return <p>Loading analytics data...</p>;
  }

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
            <p className="text-2xl font-bold text-yellow-700">${analyticsData.monthlyRevenue.toLocaleString()}</p>
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

      {/* Services Overview Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Services Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(analyticsData.allServicesRevenue || []).map((service) => (
            <ServiceOverviewCard
              key={service._id}
              serviceName={service._id}  // Assuming _id is the service name
              revenue={service.revenue}  // Monthly revenue from backend
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
