import React from 'react';

// Sample reports data
const reportsData = [
  { id: 1, title: 'Monthly Revenue Report', date: '2024-09-30', summary: 'Generated a total of $30,000 in revenue.' },
  { id: 2, title: 'User Engagement Report', date: '2024-09-28', summary: 'Active users increased by 20% this month.' },
  { id: 3, title: 'Service Feedback Report', date: '2024-09-27', summary: '95% of users rated services 4 stars and above.' },
  { id: 4, title: 'Order Completion Report', date: '2024-09-26', summary: '98% of orders completed on time.' },
];

const AdminReports = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reports Overview</h2>
      <ul className="space-y-4">
        {reportsData.map((report) => (
          <li key={report.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">{report.title}</h3>
            <p className="text-gray-600">{report.date}</p>
            <p className="text-gray-700 mt-2">{report.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReports;
