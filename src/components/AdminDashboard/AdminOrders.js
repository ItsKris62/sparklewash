// src/components/AdminDashboard/Orders.js

import { useState } from "react";
import Button from "../ui/Button"; // Updated import directly
import Table from "../ui/Table"; // Updated import directly
import Badge from "../ui/Badge"; // Updated import directly
import Input from "../ui/Input"; // Default import
import Modal from "../ui/Modal"; // Importing Modal for adding new orders

const initialOrders = [
  { id: 1, customer: "Liam Johnson", status: "Fulfilled", amount: "$250.00", date: "2023-06-23" },
  { id: 2, customer: "Olivia Smith", status: "Declined", amount: "$150.00", date: "2023-06-24" },
  { id: 3, customer: "Noah Williams", status: "Fulfilled", amount: "$350.00", date: "2023-06-25" },
  { id: 4, customer: "Emma Brown", status: "Fulfilled", amount: "$450.00", date: "2023-06-26" },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer: "", status: "Fulfilled", amount: "", date: "" });
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.amount || !newOrder.date) {
      alert("Please fill out all fields!");
      return;
    }

    const newOrderData = {
      id: orders.length + 1,
      customer: newOrder.customer,
      status: newOrder.status,
      amount: newOrder.amount,
      date: newOrder.date,
    };

    setOrders([...orders, newOrderData]);
    setShowModal(false);
    setNewOrder({ customer: "", status: "Fulfilled", amount: "", date: "" });
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)));
    setSelectedOrder(null); // Clear selected order after changing status
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Orders</h2>
      <div className="flex justify-between items-center mt-4">
        <Input
          type="search"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <Button onClick={() => setShowModal(true)} className="bg-blue-500 text-white rounded-full transition duration-200 hover:bg-blue-600">Add New Order</Button>
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
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">No orders found.</td>
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
                  <Button size="sm" className="bg-gray-300">View</Button>
                  <Button size="sm" variant="danger" className="ml-2" onClick={() => handleDeleteOrder(order.id)}>Delete</Button>
                </td>
                <td>
                  <select
                    value={selectedOrder === order.id ? order.status : ""}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    onFocus={() => setSelectedOrder(order.id)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Select Status</option>
                    <option value="Fulfilled">Fulfilled</option>
                    <option value="Pending">Pending</option>
                    <option value="Declined">Declined</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal for adding new order */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3 className="text-lg font-semibold mb-4 text-center">Add New Order</h3>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Customer Name</label>
            <Input
              type="text"
              value={newOrder.customer}
              onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
              placeholder="Enter customer name"
              className="bg-navy-500 text-white border-2 border-navy-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Status</label>
            <select
              value={newOrder.status}
              onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
              className="bg-navy-500 text-white border-2 border-navy-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Fulfilled">Fulfilled</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Amount</label>
            <Input
              type="text"
              value={newOrder.amount}
              onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
              placeholder="$0.00"
              className="bg-navy-500 text-white border-2 border-navy-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Date</label>
            <Input
              type="date"
              value={newOrder.date}
              onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
              className="bg-navy-500 text-white border-2 border-navy-700 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleAddOrder} 
              className="bg-blue-500 text-white border border-navy-600 transition duration-200 hover:bg-blue-600 rounded px-4 py-2"
            >
              Add Order
            </Button>
            <Button onClick={() => setShowModal(false)} className="bg-gray-300 ml-2 transition duration-200 hover:bg-gray-400 px-4 py-2">Cancel</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminOrders;