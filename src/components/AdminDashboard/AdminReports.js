import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdminReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState({ revenue: null, engagement: null, completion: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Fetch reports from backend
  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const month = selectedMonth.getMonth() + 1; // Adjust for zero-based month
      const year = selectedMonth.getFullYear();

      const response = await axios.get(`/api/reports?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setReports(response.data); // Expecting { revenue, engagement, completion }
    } catch (error) {
      console.error('Error fetching reports:', error);
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  }, [user.token, selectedMonth]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleMonthChange = (date) => {
    setSelectedMonth(date);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reports Overview</h2>

      {/* Month Selector */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label className="text-lg font-medium">Select Month:</label>
        <DatePicker
          selected={selectedMonth}
          onChange={handleMonthChange}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          className="border p-2 rounded-md"
        />
        <button
          onClick={fetchReports}
          className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Fetch Reports
        </button>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p>Loading reports...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Reports Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {/* Monthly Revenue Report Card */}
        <div className="bg-blue-50 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-blue-700">Monthly Revenue Report</h3>
          {reports.revenue ? (
            <>
              <p className="text-gray-600">{reports.revenue.date}</p>
              <p className="text-gray-700 mt-2">{reports.revenue.summary}</p>
              <p className="text-2xl font-bold text-blue-700 mt-4">${reports.revenue.total.toLocaleString()}</p>
            </>
          ) : (
            <p className="text-gray-500">No data available for this month.</p>
          )}
        </div>

        {/* Monthly User Engagement Report Card */}
        <div className="bg-green-50 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-green-700">User Engagement Report</h3>
          {reports.engagement ? (
            <>
              <p className="text-gray-600">{reports.engagement.date}</p>
              <p className="text-gray-700 mt-2">{reports.engagement.summary}</p>
              <p className="text-2xl font-bold text-green-700 mt-4">{reports.engagement.activeUsers} active users</p>
            </>
          ) : (
            <p className="text-gray-500">No data available for this month.</p>
          )}
        </div>

        {/* Monthly Order Completion Report Card */}
        <div className="bg-yellow-50 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-yellow-700">Order Completion Report</h3>
          {reports.completion ? (
            <>
              <p className="text-gray-600">{reports.completion.date}</p>
              <p className="text-gray-700 mt-2">{reports.completion.summary}</p>
              <p className="text-2xl font-bold text-yellow-700 mt-4">{reports.completion.completionRate}% completed</p>
            </>
          ) : (
            <p className="text-gray-500">No data available for this month.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
