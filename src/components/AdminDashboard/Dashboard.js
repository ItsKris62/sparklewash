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
    <div className="flex flex-col min-h-screen">
      {/* Main Dashboard Container */}
      <div className="flex flex-grow">
        {/* Sidebar Placeholder - Adjust width or include actual sidebar here */}
        <div className="hidden md:block w-1/6 bg-gray-100">
          {/* Placeholder content for sidebar */}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-10 bg-white">
          <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>

          {/* Revenue Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
                <CardDescription>Last month's total revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>Orders made in the last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentOrders.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Services</CardTitle>
                <CardDescription>Available services offered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div> 
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Customers</CardTitle>
                <CardDescription>Customers registered in the last month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div> 
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest transactions from customers</CardDescription>
              <Button size="sm" className="mt-2">View All</Button>
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
                      <td>{order.customer}</td>
                      <td>{order.status}</td>
                      <td>{order.date}</td>
                      <td>{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
