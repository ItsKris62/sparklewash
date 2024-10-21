import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../layouts/SideNav'; // Import SideNav
import ServicesSection from '../components/SevicesSection';
import ServiceModal from '../components/ServiceModal';
import { FaShoppingCart, FaStar } from 'react-icons/fa'; // Import icons for cards

const UserDashboard = () => {
  const [totalOrders, setTotalOrders] = useState(5);
  const [points, setPoints] = useState(200);
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate(); // Use navigate to redirect

  const services = [
    { name: 'Laundry Services', description: 'Full-service laundry care.', basePrice: 50 },
    { name: 'Dry Cleaning Services', description: 'Professional dry cleaning for delicate fabrics.', basePrice: 70 },
    { name: 'Carpet Cleaning Services', description: 'Deep carpet cleaning services.', basePrice: 100 },
    { name: 'Airbnb Cleaning Services', description: 'Comprehensive cleaning for Airbnb properties.', basePrice: 120 },
    { name: 'Meal Prep Services', description: 'Customized meal preparation services.', basePrice: 90 },
    { name: 'Landscaping Services', description: 'Professional landscaping and lawn care.', basePrice: 150 },
  ];

  const handleCheckout = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  const handleOrderSubmit = (orderDetails) => {
    console.log('Order Details:', orderDetails);
    setTotalOrders(totalOrders + 1);
    setPoints(points + 50);
    setModalOpen(false);
  };

  // Handle logout action
  const handleLogout = () => {
    // Implement logout logic here (clear session, tokens), then navigate to Home
    navigate('/'); // Redirect to Home page
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SideNav userName="Current User" onLogout={handleLogout} />

      {/* Main content section */}
      <div className="flex-1 p-8 ml-64">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Orders Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
              <p className="text-3xl font-extrabold text-blue-600">{totalOrders}</p>
            </div>
            <FaShoppingCart className="text-blue-600 text-5xl" />
          </div>

          {/* Points Gained Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Points Gained</h3>
              <p className="text-3xl font-extrabold text-blue-600">{points}</p>
            </div>
            <FaStar className="text-blue-600 text-5xl" />
          </div>
        </div>

        {/* Available Services Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Services</h2>
        <ServicesSection services={services} onCheckout={handleCheckout} />

        {/* Service Modal */}
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