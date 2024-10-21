import { useState } from "react";
import Card from "../ui/Card";
import CardHeader from "../ui/CardHeader";
import CardContent from "../ui/CardContent";
import CardTitle from "../ui/CardTitle";
import CardDescription from "../ui/CardDescription";
import Button from "../ui/Button"; 
import Table from "../ui/Table";
import { getTotalRevenue, getRecentOrders } from "../../data/dashboardData"; 

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(getTotalRevenue());
  const [recentOrders, setRecentOrders] = useState(getRecentOrders());

  return (
    <div className="flex flex-col flex-grow p-6 md:p-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>

      {/* Revenue Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-lg transition hover:shadow-xl">
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Last month's total revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="shadow-lg transition hover:shadow-xl">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
            <CardDescription>Orders made in the last month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{recentOrders.length}</div>
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
            <CardDescription>Customers registered in the last month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">42</div> 
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Section */}
      <Card className="shadow-lg transition hover:shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Orders</CardTitle>
            <Button size="sm">View All</Button>
          </div>
          <CardDescription>Latest transactions from customers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td className="border-b py-2">{order.customer}</td>
                  <td className="border-b py-2">{order.status}</td>
                  <td className="border-b py-2">{order.date}</td>
                  <td className="border-b py-2">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;