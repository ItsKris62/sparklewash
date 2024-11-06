// src/components/OrderList.js

import React from 'react';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';

const OrderList = ({ orders, onSelectOrder, onFilterChange }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Orders</h3>
        <select
          className="border border-gray-300 p-2 rounded-lg"
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <Table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Service</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Transaction Type</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Total Amount</th>
          </tr>
        </thead>
        <tbody> {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr
                key={order._id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => onSelectOrder(order)}
              >
                <td className="p-2 border">{order._id.slice(-6).toUpperCase()}</td>
                <td className="p-2 border">{order.service}</td>
                <td className="p-2 border">
                  <Badge
                    label={order.status}
                    color={
                      order.status === 'Fulfilled' ? 'bg-green-500' :
                      order.status === 'Pending' ? 'bg-yellow-500' : 
                      order.status === 'In Progress' ? 'bg-blue-500' :
                      'bg-red-500'
                    }
                  />
                </td>
                <td className="p-2 border">{order.paymentMethod}</td>
                <td className="p-2 border">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  ${order.total?.toFixed(2) || "0.00"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-2 text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default OrderList;
