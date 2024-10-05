const ServiceCard = ({ service, onCheckout }) => {
    return (
      <div className="p-4 bg-white shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
        <p className="text-gray-600">{service.description}</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
    );
  };
  
  export default ServiceCard;
  