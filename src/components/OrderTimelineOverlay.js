// src/components/OrderTimelineOverlay.js
import React from 'react';
import { FaTimes, FaCheckCircle, FaClock, FaTruck, FaClipboardList, FaBan } from 'react-icons/fa';

const statusIcons = {
  Pending: <FaClock className="text-yellow-500" />,
  "In Progress": <FaClipboardList className="text-blue-500" />,
  Shipped: <FaTruck className="text-indigo-500" />,
  Fulfilled: <FaCheckCircle className="text-green-500" />,
  "On Hold": <FaClock className="text-gray-500" />,
  Cancelled: <FaBan className="text-red-500" />,
  Failed: <FaBan className="text-red-500" />,
};

const OrderTimelineOverlay = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-6 relative">
        <button className="absolute top-4 right-4" onClick={onClose} aria-label="Close overlay">
          <FaTimes className="text-gray-500 hover:text-gray-700" />
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">Order Tracking - #{order._id}</h2>
        
        <ul className="space-y-6 relative border-l-2 border-gray-300 pl-8">
          {order.orderLogs.map((log, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {statusIcons[log.status] || <FaClock className="text-gray-500" />}
              </div>
              <div>
                <div className="text-lg font-semibold capitalize text-gray-800">{log.status}</div>
                <div className="text-sm text-gray-500">
                  {log.changedAt ? new Date(log.changedAt).toLocaleString() : 'Pending'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderTimelineOverlay;
