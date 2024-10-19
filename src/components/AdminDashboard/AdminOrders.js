// src/components/AdminDashboard/Orders.js

import { useState } from "react";
import Button from "../ui/Button"; // Update import directly
import Table from "../ui/Table"; // Update import directly
import Badge from "../ui/Badge"; // Update import directly
import Input from "../ui/Input"; // Default import

const initialOrders = [
  { id: 1, customer: "Liam Johnson", status: "Fulfilled", amount: "$250.00", date: "2023-06-23" },
  { id: 2, customer: "Olivia Smith", status: "Declined", amount: "$150.00", date: "2023-06-24" },
  { id: 3, customer: "Noah Williams", status: "Fulfilled", amount: "$350.00", date: "2023-06-25" },
  { id: 4, customer: "Emma Brown", status: "Fulfilled", amount: "$450.00", date: "2023-06-26" },
  // Add more sample orders as needed
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl">Orders</h2>
      <div className="flex justify-between mt-4">
        <Input
          type="search"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <Button className="mt-0">Add New Order</Button>
      </div>
      
      <Table className="mt-4">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No orders found.</td>
            </tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>
                  <Badge label={order.status} color={order.status === "Fulfilled" ? "bg-green-500" : "bg-red-500"} />
                </td>
                <td>{order.amount}</td>
                <td>{order.date}</td>
                <td>
                  <Button size="sm">View</Button>
                  <Button size="sm" variant="danger" className="ml-2">Delete</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminOrders;