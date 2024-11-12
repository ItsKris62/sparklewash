// src/pages/OrderTrackingPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../layouts/SideNav';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import OrderList from '../components/OrderList';
import OrderTimelineOverlay from '../components/OrderTimelineOverlay';
import BreadcrumbPagination from '../components/ui/BreadcrumbPagination';
import { useAuth } from '../components/context/AuthContext';
import axios from 'axios';

const OrderTrackingPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  // Fetch orders with error handling and token check
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/orders/${user._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [user?._id, user?.token, logout, navigate]);

  // Fetch orders on component mount if user is authenticated
  useEffect(() => {
    if (user?.token) fetchOrders();
  }, [user?.token, fetchOrders]);

  // Filter orders based on search term and filter status
  const applyFilters = useCallback(() => {
    let result = orders;

    if (searchTerm) {
      result = result.filter(order => 
        order.service?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter !== 'all') {
      result = result.filter(order => order.status === filter);
    }

    setFilteredOrders(result);
  }, [orders, searchTerm, filter]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle selection of an order for overlay display
  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  // Close the overlay
  const closeOverlay = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 p-4 md:p-8 ml-16 md:ml-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Order Tracking</h1>

          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <SearchBar onSearch={setSearchTerm} />
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              <OrderList
                orders={filteredOrders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
                onSelectOrder={handleSelectOrder}
              />

              <BreadcrumbPagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredOrders.length / rowsPerPage)}
                onPageChange={setCurrentPage}
              />

              {selectedOrder && (
                <OrderTimelineOverlay order={selectedOrder} onClose={closeOverlay} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
