import { useState, useEffect, useCallback } from "react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import CardContent from "../ui/CardContent";
import CardTitle from "../ui/CardTitle";
import CardDescription from "../ui/CardDescription";
import Button from "../ui/Button";
import Table from "../ui/Table";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [previousRevenue, setPreviousRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [newCustomers, setNewCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [points, setPoints] = useState(0);
  const [previousNewCustomers, setPreviousNewCustomers] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const headers = { 
        Authorization: `Bearer ${user.token}`, 
        'Content-Type': 'application/json',
      };
      
      const [revenueResponse, customersResponse, ordersResponse, pointsResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/total-revenue", { headers }),
        axios.get("http://localhost:5000/api/admin/new-customers", { headers }),
        axios.get("http://localhost:5000/api/admin/orders", { headers }),
        
      ]);
  
      setTotalRevenue(revenueResponse.data.totalRevenue);
      setPreviousRevenue(revenueResponse.data.previousMonthRevenue || 0);
      setNewCustomers(customersResponse.data.newCustomersCount);
      setPreviousNewCustomers(customersResponse.data.previousMonthNewCustomers || 0);
      setRecentOrders(ordersResponse.data.orders || []);
  
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch dashboard data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const getIndicator = (current, previous) => {
    if (current > previous) {
      return <FaArrowUp className="text-green-500 ml-2" />;
    } else if (current < previous) {
      return <FaArrowDown className="text-red-500 ml-2" />;
    }
    return null;
  };

  const renderOrdersTable = () => {
    if (recentOrders.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No recent orders found
        </div>
      );
    }

 // Sort recent orders by createdAt date in descending order and take the top 15
 const sortedOrders = [...recentOrders]
 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
 .slice(0, 15); // Limit to 15 orders

    return (
      <Table className="w-full">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map(order => (
            <tr key={order._id}>
              <td className="border-b py-2">
                {order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : 'Unknown'}
              </td>
              <td className="border-b py-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="border-b py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="border-b py-2">${order.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <Button onClick={fetchData}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="ml-2 mt-5 p-6 bg-white rounded-lg shadow-md min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg transition hover:shadow-xl">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Last month's total revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-2xl font-bold text-green-600">
              ${totalRevenue.toLocaleString()}
              {getIndicator(totalRevenue, previousRevenue)}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg transition hover:shadow-xl">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Orders made in the last month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-2xl font-bold text-blue-600">
              {recentOrders.length}
              {getIndicator(recentOrders.length, previousNewCustomers)}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg transition hover:shadow-xl">
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
            <CardDescription>Available services offered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">6</div>
          </CardContent>
        </Card>

        <Card className="shadow-lg transition hover:shadow-xl">
          <CardHeader>
            <CardTitle>New Customers</CardTitle>
            <CardDescription>Customers registered in the current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-2xl font-bold text-orange-600">
              {newCustomers}
              {getIndicator(newCustomers, previousNewCustomers)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg transition hover:shadow-xl">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest transactions from today</CardDescription>
        </CardHeader>
        <CardContent>
          {renderOrdersTable()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
