// src/components/ServiceModal.js
import { useState, useEffect } from 'react';
import Toast from '../components/ui/Toast';
import { useAuth } from '../components/context/AuthContext';

/**
 * ServiceModal is a modal component that allows users to enter details for a particular service,
 * such as location, number of rooms, type of fabrics, and extra services. It also displays the total
 * price with tax and allows users to select a payment method.
 * When the user clicks the "Confirm Order" button, it sends a POST request to the server to create a new order.
 * If the order is created successfully, it shows a success toast message, invokes the onSubmit callback with the order data,
 * and closes the modal. In case of an error during submission, it logs the error and shows an error toast message.
 * @param {Object} service - The service object containing the name, base price, and additional services.
 * @param {boolean} isOpen - A boolean indicating whether the modal is open or closed.
 * @param {function} onClose - A function to be called when the user clicks the "Cancel" button.
 * @param {function} onSubmit - A function to be called after a successful order creation. It receives the order data as an argument.
 * @returns {JSX.Element} A JSX element representing the modal component.
 */
const ServiceModal = ({ service, isOpen, onClose, onSubmit }) => {
  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState(1);
  const [fabrics, setFabrics] = useState('');
  const [extras, setExtras] = useState([]);
  const [total, setTotal] = useState(service.basePrice || 0);
  const [extraServices, setExtraServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Pay on Delivery - MPESA');
  const { user } = useAuth();
  const [toast, setToast] = useState(null);

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

  useEffect(() => {
    const extraCost = extras.reduce((sum, extra) => sum + extra.price, 0);
    const subTotal = service.basePrice + extraCost;
    const tax = subTotal * 0.2;
    setTotal(subTotal + tax);
  }, [extras, service.basePrice]);

  const handleExtraChange = (extraService, checked) => {
    setExtras((prevExtras) =>
      checked ? [...prevExtras, extraService] : prevExtras.filter((extra) => extra.name !== extraService.name)
    );
  };

  const handleSubmit = async () => {
    const orderDetails = {
      service: service.name,
      location,
      rooms,
      fabrics,
      extras,
      basePrice: service.basePrice,
      total,
      paymentMethod,
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
        setToast({ message: 'Order created successfully!', type: 'success' });
        onSubmit(data);
        onClose();
      } else {
        setToast({ message: 'Failed to create order', type: 'error' });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setToast({ message: 'Error creating order', type: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg transition transform duration-300 ease-in-out overflow-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Enter details for {service.name}
        </h2>

        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2 text-gray-700">Location</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        {/* Rooms Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2 text-gray-700">Number of Rooms</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
          />
        </div>

        {/* Fabrics Input */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2 text-gray-700">Type of Fabrics</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            value={fabrics}
            onChange={(e) => setFabrics(e.target.value)}
            placeholder="e.g., Cotton, Polyester"
          />
        </div>

        {/* Extra Services Checkboxes */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2 text-gray-700">Extra Services</label>
          <div className="flex flex-col space-y-2">
            {extraServices.map((extra, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 h-5 w-5 text-blue-600 focus:ring-2 focus:ring-blue-500 rounded-full"
                  checked={extras.some((e) => e.name === extra.name)}
                  onChange={(e) => handleExtraChange(extra, e.target.checked)}
                />
                <label className="text-gray-700">{extra.name} (+${extra.price})</label>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="Pay on Delivery - Cash">Pay on Delivery - Cash</option>
            <option value="Pay on Delivery - MPESA">Pay on Delivery - MPESA</option>
            <option value="MPESA (Direct)">MPESA (Direct)</option>
          </select>
        </div>

        {/* Total Price Display */}
        <div className="text-lg font-semibold text-gray-800 text-center mb-8">
          Total (with tax): <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex justify-between">
          <button
            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-colors duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            onClick={handleSubmit}
          >
            Confirm Order
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ServiceModal;
