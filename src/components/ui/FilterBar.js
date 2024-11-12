// src/components/ui/FilterBar.js
import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center space-x-4">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 rounded-md p-2"
      >
        <option value="all">All Orders</option>
        <option value="fulfilled">Fulfilled</option>
        <option value="in progress">In Progress</option>
        <option value="pending">Pending</option>
        <option value="cancelled">Cancelled</option>
        <option value="failed">Failed</option>
        <option value="on hold">On Hold</option>
      </select>
    </div>
  );
};

export default FilterBar;
