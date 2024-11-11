import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../ui/Button';
import Table from '../ui/Table';
import Input from '../ui/Input';
import { saveAs } from 'file-saver';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logType, setLogType] = useState('all'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user } = useAuth();

  // Fetch logs from the server
  const fetchLogs = useCallback (async () => {
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

      // Log the response for debugging
    const responseData = await response.json();
    console.log('Response Data:', responseData); // Log the response data


      if (!response.ok) {
        throw new Error(`Failed to fetch logs: ${response.status} ${response.statusText}`);
      }

       // Check if the logs are in the expected format
       if (!Array.isArray(responseData.logs)) throw new Error("Unexpected data format received from server.");

       setLogs(responseData.logs); // Update the logs state
   } catch (error) {
       setError(error.message || "An unknown error occurred while fetching logs.");
   } finally {
       setLoading(false);
   }
}, [user]);

  useEffect(() => {
    if (user) { // Ensure user is defined before fetching logs
      fetchLogs();
      const intervalId = setInterval(fetchLogs, 30000); // 30 seconds interval for real-time updates
      return () => clearInterval(intervalId);
    }
  }, [user, fetchLogs]);
  // Filter logs based on selected criteria
  const filteredLogs = logs
    .filter(log => {
      if (logType !== 'all' && log.type !== logType) return false;
      if (searchTerm && !log.action.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (startDate && new Date(log.timestamp) < new Date(startDate)) return false;
      if (endDate && new Date(log.timestamp) > new Date(endDate)) return false;
      return true;
    })
    .slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  // Export logs to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Timestamp', 'Type', 'Action', 'Path', 'Status'],
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.type || 'N/A',
        log.action,
        log.path,
        log.status || 'N/A',
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'logs.csv');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Admin Logs</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex gap-2">
          {['all', 'system', 'user', 'service'].map((type) => (
            <Button
              key={type}
              onClick={() => {
                setLogType(type);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className={`rounded-lg px-4 py-2 ${
                logType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Logs
            </Button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-2 items-center mt-4 md:mt-0">
          <Input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <Input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <Input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <Button onClick={exportToCSV} className="bg-green-500 text-white rounded-lg px-4 py-2">
            Export CSV
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading logs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredLogs.length === 0 ? (
        <p>No logs available for the selected category.</p>
      ) : (
        <>
          <Table className="min-w-full bg-white border rounded">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Timestamp</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Type</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Action</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Path</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log._id} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-4">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-4 capitalize">{log.type || 'N/A'}</td>
                  <td className="py-3 px-4">{log.action}</td>
                  <td className="py-3 px-4">{log.path}</td>
                  <td className="py-3 px-4">{log.status || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            >
              Previous
            </Button>
            <span>Page {currentPage}</span>
            <Button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage * logsPerPage >= logs.length}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLogs;
