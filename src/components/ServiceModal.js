// src/components/ServiceModal.js
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/context/AuthContext';

const ServiceModal = ({ service, isOpen, onClose, onSubmit }) => {
  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState(1); // Enable user input for number of rooms
  const [fabrics, setFabrics] = useState(''); // Enable user input for fabric type
  const [extras, setExtras] = useState([]);
  const [total, setTotal] = useState(service.basePrice || 0);
  const [extraServices, setExtraServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Pay on Delivery - MPESA');
  const { user } = useAuth();

  // Fetch additional services based on selected service
  useEffect(() => {
    const fetchExtras = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        const data = await response.json();
        const selectedService = data.find((item) => item.name === service.name);
        setExtraServices(selectedService ? selectedService.additionalServices : []);
      } catch (error) {
        console.error('Error fetching additional services:', error);
      }
    };
    fetchExtras();
  }, [service]);

  // Calculate total with additional services and tax
  useEffect(() => {
    const extraCost = extras.reduce((sum, extra) => sum + extra.price, 0);
    const subTotal = service.basePrice + extraCost;
    const tax = subTotal * 0.2;
    setTotal(subTotal + tax);
  }, [extras, service.basePrice]);

  // Toggle extra services selection
  const handleExtraChange = (extraService, checked) => {
    const updatedExtras = checked
      ? [...extras, { name: extraService.name, price: extraService.price }]
      : extras.filter((extra) => extra.name !== extraService.name);
    setExtras(updatedExtras);
  };

  // Handle Order Submission
  const handleSubmit = async () => {
    const orderDetails = {
      service: service.name,
      location,
      rooms,
      fabrics,
      extras,
      basePrice: service.basePrice,
      total,
      paymentMethod
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Order created successfully!');
        onSubmit(data);
        onClose();
      } else {
        toast.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error creating order');
    }
  };

  if (!isOpen) return null; // Close Modal if not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter details for {service.name}</h2>

        {/* Location Field */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Where are you located?</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        {/* Rooms Field */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Number of Rooms</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 p-2 rounded"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
          />
        </div>

        {/* Fabrics Field */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Type of Fabrics</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={fabrics}
            onChange={(e) => setFabrics(e.target.value)}
            placeholder="e.g., Cotton, Polyester"
          />
        </div>

        {/* Extra Services */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Extra Services</label>
          {extraServices.map((extra, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={extras.some((e) => e.name === extra.name)}
                onChange={(e) => handleExtraChange(extra, e.target.checked)}
              />
              <label>{extra.name} (+${extra.price})</label>
            </div>
          ))}
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="Pay on Delivery - Cash">Pay on Delivery - Cash</option>
            <option value="Pay on Delivery - MPESA">Pay on Delivery - MPESA</option>
            <option value="MPESA (Direct)">MPESA (Direct)</option>
          </select>
        </div>

        {/* Total Display */}
        <div className="mt-4 font-bold">Total (with tax): ${total.toFixed(2)}</div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-navy text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
