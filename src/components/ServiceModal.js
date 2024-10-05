import { useState } from 'react';

const ServiceModal = ({ service, isOpen, onClose, onSubmit }) => {
  const [location, setLocation] = useState('');
  const [rooms, setRooms] = useState(1);
  const [fabrics, setFabrics] = useState('');
  const [extras, setExtras] = useState([]);
  const [total, setTotal] = useState(service.basePrice || 0);

  const extraServices = [
    { name: 'Bed Sheets Cleaning', price: 20 },
    { name: 'Surface Cleaning', price: 30 },
    { name: 'Dishes Cleaning', price: 15 },
    { name: 'Ironing of Sheets', price: 25 },
    { name: 'Carpet Cleaning', price: 40 },
    { name: 'Stain Removal', price: 35 }
  ];

  const handleExtraChange = (extraService, checked) => {
    let newExtras = checked
      ? [...extras, extraService.name]
      : extras.filter((extra) => extra !== extraService.name);

    setExtras(newExtras);
    setTotal(
      checked ? total + extraService.price : total - extraService.price
    );
  };

  const handleSubmit = () => {
    const orderDetails = { location, rooms, fabrics, extras, total };
    onSubmit(orderDetails);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter details for {service.name}</h2>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Location</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Number of Rooms</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 p-2 rounded"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          />
        </div>

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

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Extra Services</label>
          {extraServices.map((extra, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={extras.includes(extra.name)}
                onChange={(e) => handleExtraChange(extra, e.target.checked)}
              />
              <label>{extra.name} (+${extra.price})</label>
            </div>
          ))}
        </div>

        <div className="mt-4 font-bold">Total: ${total}</div>

        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
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
