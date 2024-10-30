// src/pages/OrdersPage.js
import React, { useState, useEffect, useCallback } from 'react';
import SideNav from '../layouts/SideNav';
import SearchBar from '../components/SearchBar';
import OrderList from '../components/OrderList';
import OrderDetailCard from '../components/OrderDetailCard';
import { useUser } from '../components/context/UserContext';

const OrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('weekly');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const applyFilters = useCallback((ordersData) => {
    let filtered = ordersData;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const now = new Date();
    filtered = filtered.filter(order => {
      const orderDate = new Date(order.date);
      if (filter === 'weekly') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        return orderDate >= oneWeekAgo;
      } else if (filter === 'monthly') {
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      } else if (filter === 'yearly') {
        return orderDate.getFullYear() === now.getFullYear();
      }
      return true;
    });

    setFilteredOrders(filtered);
  }, [searchTerm, filter]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`http://localhost:5000/api/orders/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await response.json();
      applyFilters(data); // Apply filters immediately to the fetched data
    };
    fetchOrders();
  }, [user, applyFilters]);

  const handleSearch = (term) => setSearchTerm(term);
  const handleFilterChange = (newFilter) => setFilter(newFilter);

  const handleSelectOrder = (order) => setSelectedOrder(order);

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="p-6 ml-64 w-full">
        <SearchBar onSearch={handleSearch} />
        <OrderList orders={filteredOrders} onSelectOrder={handleSelectOrder} onFilterChange={handleFilterChange} />
        <OrderDetailCard order={selectedOrder} />
      </div>
    </div>
  );
};

export default OrdersPage;
