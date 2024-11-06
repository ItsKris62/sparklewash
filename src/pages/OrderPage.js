import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../layouts/SideNav';
import SearchBar from '../components/SearchBar';
import OrderList from '../components/OrderList';
import OrderDetailCard from '../components/OrderDetailCard';
import { useAuth } from '../components/context/AuthContext';
import { FaSync } from 'react-icons/fa';
import axios from 'axios';

const OrderPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('weekly');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders from the backend
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/orders/user-orders', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      
      const ordersData = response.data;
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      const errorMessage = err.response?.data?.message || 'Failed to fetch orders';
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
      
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user?.token, logout, navigate]);

  useEffect(() => {
    if (user?.token) {
      fetchOrders();
    }
  }, [user?.token, fetchOrders]);

  // Apply filters to orders
  const applyFilters = useCallback(() => {
    if (!orders.length) {
      setFilteredOrders([]);
      return;
    }

    const now = new Date();
    const filtered = orders
      .filter(order => {
        const serviceName = order.service?.toLowerCase() || '';
        return serviceName.includes(searchTerm.toLowerCase());
      })
      .filter(order => {
        const orderDate = new Date(order.createdAt);
        switch (filter) {
          case 'weekly':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return orderDate >= weekAgo;
          case 'monthly':
            return orderDate.getMonth() === now.getMonth() && 
                   orderDate.getFullYear() === now.getFullYear();
          case 'yearly':
            return orderDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredOrders(filtered);
  }, [orders, searchTerm, filter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleRefresh = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSelectOrder = useCallback((order) => {
    setSelectedOrder(order);
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideNav />
        <div className="flex-1 p-8 ml-64 flex justify-center items-center">
          <div className="text-xl text-gray-600">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 p-4 md:p-8 ml-16 md:ml-64">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none">
                <SearchBar onSearch={setSearchTerm} />
              </div>
              <button 
                onClick={handleRefresh} 
                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                aria-label="Refresh orders"
              >
                <FaSync className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            <OrderList 
              orders={filteredOrders} 
              onSelectOrder={handleSelectOrder} 
              onFilterChange={handleFilterChange}
            />
            {selectedOrder && (
              <OrderDetailCard 
                order={selectedOrder} 
                onClose={() => setSelectedOrder(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;