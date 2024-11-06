import { FaShoppingCart, FaStar } from 'react-icons/fa';

const DashboardCards = ({ totalOrders, points }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    {/* Total Orders Card */}
    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg shadow-lg flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div>
        <h3 className="text-lg font-medium">Total Orders</h3>
        <p className="text-4xl font-extrabold mt-2">{totalOrders}</p>
      </div>
      <div className="bg-white rounded-full p-4">
        <FaShoppingCart className="text-blue-700 text-5xl" />
      </div>
    </div>

    {/* Points Gained Card */}
    <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-8 rounded-lg shadow-lg flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div>
        <h3 className="text-lg font-medium">Points Gained</h3>
        <p className="text-4xl font-extrabold mt-2">{points}</p>
      </div>
      <div className="bg-white rounded-full p-4">
        <FaStar className="text-green-600 text-5xl" />
      </div>
    </div>
  </div>
);

export default DashboardCards;
