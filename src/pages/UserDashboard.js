// src/pages/UserDashboard.js

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import SideNav from '../layouts/SideNav';
import ServicesSection from '../components/SevicesSection';
import ServiceModal from '../components/ServiceModal';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import axios from 'axios';

const UserDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [points, setPoints] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const services = [
    { name: 'Laundry Services', description: 'Full-service laundry care.', basePrice: 50 },
    { name: 'Dry Cleaning Services', description: 'Professional dry cleaning for delicate fabrics.', basePrice: 70 },
    { name: 'Carpet Cleaning Services', description: 'Deep carpet cleaning services.', basePrice: 100 },
    { name: 'Airbnb Cleaning Services', description: 'Comprehensive cleaning for Airbnb properties.', basePrice: 120 },
    { name: 'Meal Prep Services', description: 'Customized meal preparation services.', basePrice: 90 },
    { name: 'Landscaping Services', description: 'Professional landscaping and lawn care.', basePrice: 150 },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const ordersResponse = await axios.get('/api/orders/user-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalOrders(ordersResponse.data.totalOrders || 0);

        const pointsResponse = await axios.get('/api/users/points', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoints(pointsResponse.data.points || 0);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) logout();
      }
    };

    fetchUserData();
  }, [logout]);

  const handleCheckout = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  const handleOrderSubmit = async (orderDetails) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/orders', orderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTotalOrders((prevTotal) => prevTotal + 1);
      setModalOpen(false);
      console.log('Order successfully submitted:', response.data);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideNav onLogout={logout} />
      <div className="flex-1 p-8 ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
              <p className="text-3xl font-extrabold text-blue-600">{totalOrders}</p>
            </div>
            <FaShoppingCart className="text-blue-600 text-5xl" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Points Gained</h3>
              <p className="text-3xl font-extrabold text-blue-600">{points}</p>
            </div>
            <FaStar className="text-blue-600 text-5xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Services</h2>
        <ServicesSection services={services} onCheckout={handleCheckout} />
        {selectedService && (
          <ServiceModal
            service={selectedService}
            isOpen={modalOpen}
            onClose={handleModalClose}
            onSubmit={handleOrderSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
