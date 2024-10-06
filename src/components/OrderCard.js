const OrderCard = ({ onCreateNewOrder }) => {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Orders</h2>
        <p className="mb-4">Ready to make your next order?</p>
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
          onClick={onCreateNewOrder}
        >
          Create New Order
        </button>
      </div>
    );
  };
  
  export default OrderCard;
  