import React, { useState } from 'react';

const ServiceOverlay = ({ service, onClose }) => {
  const [details, setDetails] = useState({
    location: '',
    rooms: 1,
    fabrics: '',
    extras: [],
  });

  const extrasList = [
    'Bed Sheets Cleaning',
    'Surface Cleaning',
    'Dishes Cleaning',
    'Ironing of Sheets',
    'Carpet Cleaning',
    'Stain Removal',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleExtraChange = (extra) => {
    setDetails((prev) => {
      const { extras } = prev;
      return {
        ...prev,
        extras: extras.includes(extra)
          ? extras.filter((e) => e !== extra)
          : [...extras, extra],
      };
    });
  };

  const handleSubmit = () => {
    console.log('Service details:', details);
    onClose(details);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-lg w-1/2">
        <h3 className="text-xl font-bold mb-4">Details for {service.name}</h3>
        {service.name === 'Airbnb Cleaning Services' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={details.location}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Number of Rooms</label>
              <input
                type="number"
                name="rooms"
                min="1"
                value={details.rooms}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Type of Fabrics</label>
              <input
                type="text"
                name="fabrics"
                value={details.fabrics}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </>
        )}

        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">Extra Services</h4>
          <div className="grid grid-cols-2 gap-4">
            {extrasList.map((extra, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handleExtraChange(extra)}
                  checked={details.extras.includes(extra)}
                />
                {extra}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="bg-gray-400 text-white py-2 px-4 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={handleSubmit}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceOverlay;
