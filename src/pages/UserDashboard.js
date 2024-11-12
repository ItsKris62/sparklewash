import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import SideNav from '../layouts/SideNav';
import ServicesSection from '../components/SevicesSection';
import ServiceModal from '../components/ServiceModal';
import { FaShoppingCart, FaStar, FaTshirt, FaLeaf, FaBroom, FaSoap, FaSprayCan, FaUtensils, FaFireAlt } from 'react-icons/fa';
import axios from 'axios';

const UserDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(() => 
    parseInt(localStorage.getItem('totalOrders') || '0')
  );
  const [points, setPoints] = useState(() => 
    parseInt(localStorage.getItem('points') || '0')
  );
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Icon mapping for each service
  const serviceIcons = {
    'Landscaping Service': <FaLeaf className="text-green-500 text-4xl" />,
    'Laundry and Ironing Services': <FaFireAlt className="text-orange-500 text-4xl" />,
    'Laundry Services': <FaSoap className="text-blue-500 text-6xl" />,
    'Airbnb Cleaning Services': <FaBroom className="text-purple-500 text-4xl" />,
    'Meal Prep Services': <FaUtensils className="text-red-500 text-4xl" />,
    'Carpet Cleaning Services': <FaSprayCan className="text-indigo-500 text-4xl" />,
    'Dry Cleaning Services': <FaTshirt className="text-cyan-500 text-5xl" />
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [servicesRes, ordersRes, pointsRes] = await Promise.all([
        axios.get('/api/services', {
          headers: { Authorization: `Bearer ${user?.token}` }
        }),
        axios.get('/api/orders/user-orders', {
          headers: { Authorization: `Bearer ${user?.token}` }
        }),
        axios.get('/api/points', {
          headers: { Authorization: `Bearer ${user?.token}` }
        })
      ]);

      setServices(servicesRes.data);
      
      const userTotalOrders = ordersRes.data.length || 0;
      setTotalOrders(userTotalOrders);
      localStorage.setItem('totalOrders', userTotalOrders.toString());

      const userPoints = pointsRes.data.points || 0;
      setPoints(userPoints);
      localStorage.setItem('points', userPoints.toString());

    } catch (err) {
      console.error('Error fetching data:', err);
      const errorMessage = err.response?.data?.message || 'Error fetching data';
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [user?.token, logout, navigate]);

  useEffect(() => {
    if (user?.token) {
      fetchData();
    }
  }, [user?.token, fetchData]);

  const handleCheckout = useCallback((service) => {
    setSelectedService(service);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setSelectedService(null);
  }, []);

  const handleOrderSubmit = useCallback(async (orderDetails) => {
    try {
      const basePoints = 5;
      const extraPoints = orderDetails.extras?.length || 0;
      const totalPoints = basePoints + extraPoints;
  
      const orderData = {
        service: orderDetails.service,
        location: orderDetails.location,
        rooms: orderDetails.rooms,
        fabrics: orderDetails.fabrics,
        extras: orderDetails.extras,
        total: orderDetails.total,
        paymentMethod: orderDetails.paymentMethod,
        pointsEarned: totalPoints
      };
  
      await axios.post('/api/orders', orderData, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
  
      await axios.post('/api/points/add', {
        points: totalPoints,
        description: `Order for ${orderDetails.service}`
      }, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
  
      setTotalOrders(prevOrders => {
        const newTotal = prevOrders + 1;
        localStorage.setItem('totalOrders', newTotal.toString());
        return newTotal;
      });
  
      setPoints(prevPoints => {
        const newPoints = prevPoints + totalPoints;
        localStorage.setItem('points', newPoints.toString());
        return newPoints;
      });
  
      setModalOpen(false);
      alert(`Order placed successfully! You earned ${totalPoints} points!`);
  
    } catch (err) {
      console.error('Error submitting order:', err);
      alert(err.response?.data?.message || 'Failed to place order. Please try again.');
    }
  }, [user?.token]);

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <SideNav />
        <div className="p-6 ml-64 w-full flex justify-center items-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <SideNav />
      
      <div className="flex-1 p-8 ml-64">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-lg flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div>
              <h3 className="text-lg font-medium">Total Orders</h3>
              <p className="text-4xl font-extrabold mt-2">{totalOrders}</p>
            </div>
            <div className="bg-white rounded-full p-4">
              <FaShoppingCart className="text-blue-700 text-5xl" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-8 rounded-lg shadow-lg flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div>
              <h3 className="text-lg font-medium">Points Gained</h3>
              <p className="text-4xl font-extrabold mt-2">{points}</p>
            </div>
            <div className="bg-white rounded-full p-4">
              <FaStar className="text-green-600 text-5xl" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-700">Available Services</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <ServicesSection services={services} onCheckout={handleCheckout} icons={serviceIcons} />
        </div>

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
