import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Function to fetch logs with error handling
  const fetchLogs = async () => {
    setLoading(true);
    setError(null);

    if (!user || !user.token) {
      setError("Authentication error. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/logs', {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch logs: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format received from server.");
      }

      setLogs(data);
    } catch (error) {
      setError(error.message || "An unknown error occurred while fetching logs.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch logs on mount and set up real-time updates every 30 seconds
  useEffect(() => {
    fetchLogs();

    // Set up polling for real-time updates
    const intervalId = setInterval(fetchLogs, 30000); // 30 seconds interval
    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">System Logs</h2>

      {loading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Timestamp</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t hover:bg-gray-100">
                <td className="py-3 px-4">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="py-3 px-4">{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminLogs;
