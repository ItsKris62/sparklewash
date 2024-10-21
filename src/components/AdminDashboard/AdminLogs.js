import React from 'react';

// Sample logs data
const logsData = [
  { id: 1, timestamp: '2024-10-01 10:00', action: 'User created an order' },
  { id: 2, timestamp: '2024-10-01 11:30', action: 'Admin updated user info' },
  { id: 3, timestamp: '2024-10-02 09:15', action: 'User deleted account' },
  { id: 4, timestamp: '2024-10-02 12:45', action: 'System maintenance completed' },
];

const AdminLogs = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">System Logs</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-left">
            <th className="py-2 px-4">Timestamp</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {logsData.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="py-2 px-4">{log.timestamp}</td>
              <td className="py-2 px-4">{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLogs;
