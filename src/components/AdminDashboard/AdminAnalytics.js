// src/pages/AdminAnalytics.js
import React, { useState, useEffect, useCallback } from 'react';
import { MdPeople, MdShoppingCart, MdAttachMoney, MdPerson } from 'react-icons/md';
import axios from 'axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';
// import ServiceOverviewCard from '../ui/ServiceOverviewCard';

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    activeUsers: 0,
    allServicesRevenue: [],
  });

  const [orderStatusData, setOrderStatusData] = useState({});
  const [servicePerformanceData, setServicePerformanceData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { user } = useAuth();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

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

  const fetchChartsData = useCallback(async () => {
    try {
      const [statusRes, performanceRes] = await Promise.all([
        axios.get('/api/admin/analytics/order-status', {
          headers: { Authorization: `Bearer ${user.token}` },
          params: { month: selectedMonth, year: selectedYear },
        }),
        axios.get('/api/admin/analytics/service-performance', {
          headers: { Authorization: `Bearer ${user.token}` },
          params: { month: selectedMonth, year: selectedYear },
        }),
      ]);

      // Process Order Status Data for Doughnut Chart
      const statusLabels = statusRes.data.map(item => item._id);
      const statusCounts = statusRes.data.map(item => item.count);
      setOrderStatusData({
        labels: statusLabels,
        datasets: [
          {
            label: 'Order Status',
            data: statusCounts,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          },
        ],
      });

      // Process Service Performance Data for Bar Chart
      const serviceLabels = performanceRes.data.map(item => item._id);
      const serviceCounts = performanceRes.data.map(item => item.count);
      setServicePerformanceData({
        labels: serviceLabels,
        datasets: [
          {
            label: 'Service Performance',
            data: serviceCounts,
            backgroundColor: '#36A2EB',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  }, [user.token, selectedMonth, selectedYear]);

  useEffect(() => {
    fetchAnalyticsData();
    fetchChartsData();
    const intervalId = setInterval(fetchAnalyticsData, 30000); // 30 seconds
    return () => clearInterval(intervalId);
  }, [fetchAnalyticsData, fetchChartsData]);

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

      {/* Month and Year Filters */}
      <div className="flex justify-between items-center mt-8 mb-6">
        <div>
          <label className="text-gray-700 mr-4 font-medium">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
            className="border border-gray-300 rounded-md p-2"
          >
            {months.map((month, index) => (
              <option value={index} key={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-gray-700 mr-4 font-medium">Select Year:</label>
          <input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            className="border border-gray-300 rounded-md p-2 w-24"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doughnut Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Status Overview</h3>
          {orderStatusData?.datasets ? (
            <Doughnut data={orderStatusData} />
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Performance</h3>
          {servicePerformanceData?.datasets ? (
            <Bar data={servicePerformanceData} options={{ responsive: true }} />
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
