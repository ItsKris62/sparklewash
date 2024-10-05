const DashboardHeader = ({ totalOrders, points }) => {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h2>
        <div className="flex justify-between items-center">
          <div className="text-lg">
            <p>Total Orders: <span className="font-semibold">{totalOrders}</span></p>
            <p>Points Gained: <span className="font-semibold">{points}</span></p>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardHeader;
  