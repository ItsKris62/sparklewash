const ServiceCard = ({ service, onCheckout, icon }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-center mb-4">
        {icon || <span className="text-gray-400 text-4xl">⚙️</span>} {/* Default icon if none provided */}
      </div>
      <h3 className="text-2xl font-semibold mb-2 text-center">{service.name}</h3>
      <p className="text-gray-600 mb-6 text-center">{service.description}</p>
      <button
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 w-full"
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default ServiceCard;
