const ServiceCard = ({ service, onCheckout }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-2xl font-semibold mb-4">{service.name}</h3>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <button
        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700"
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default ServiceCard;
