import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../layouts/SideNav'; // Import your SideNav
import ServicesSection from '../components/SevicesSection';
import ServiceModal from '../components/ServiceModal';

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
    <div className="flex">
      <SideNav userName="Current User" onLogout={handleLogout} /> {/* Pass user name and logout handler */}
      
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Available Services</h2>
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