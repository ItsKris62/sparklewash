import { useState } from 'react';

const OrderList = ({ orders, onSelectOrder, onFilterChange }) => {
  const [filter, setFilter] = useState('weekly'); // Default filter

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Orders</h3>
        <select
          className="border border-gray-300 p-2 rounded-lg"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Invoice Number</th>
            <th className="p-2 border">Service Type</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Transaction Type</th>
            <th className="p-2 border">Transaction Reference</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={index}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectOrder(order)}
            >
              <td className="p-2 border">{order.invoiceNumber}</td>
              <td className="p-2 border">{order.serviceType}</td>
              <td className={`p-2 border ${order.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>{order.status}</td>
              <td className="p-2 border">{order.transactionType}</td>
              <td className="p-2 border">{order.transactionReference}</td>
              <td className="p-2 border">{new Date(order.date).toLocaleDateString()}</td>
              <td className="p-2 border">${order.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
