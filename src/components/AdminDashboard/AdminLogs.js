import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure you get the token from AuthContext

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Assuming admin token is in AuthContext

  // Fetch logs from backend on component mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/logs', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch logs.');
        
        const data = await response.json();
        setLogs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user.token]);

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
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-200 text-left">
              <th className="py-2 px-4">Timestamp</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t">
                <td className="py-2 px-4">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="py-2 px-4">{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminLogs;
