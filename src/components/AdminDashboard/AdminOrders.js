// src/components/AdminDashboard/Orders.js
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Table from "../ui/Table";
import Badge from "../ui/Badge";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import { useAuth } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    status: "Fulfilled",
    amount: "",
    date: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/admin/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!response.ok) throw new Error("Failed to load orders.");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Could not load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user.token]);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "All" || order.status === selectedStatus;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddOrder = async () => {
    if (!newOrder.customer || !newOrder.amount || !newOrder.date) {
      alert("Please fill out all fields!");
      return;
    }

    const newOrderData = {
      customer: newOrder.customer,
      status: newOrder.status,
      amount: newOrder.amount,
      date: newOrder.date,
    };

    try {
      const response = await fetch("http://localhost:5000/api/admin/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newOrderData),
      });
      if (!response.ok) throw new Error("Failed to add order.");

      const addedOrder = await response.json();
      setOrders([...orders, addedOrder]);
      setShowModal(false);
      setNewOrder({ customer: "", status: "Fulfilled", amount: "", date: "" });
    } catch (error) {
      console.error("Error adding order:", error);
      setError("Could not add order. Please try again later.");
    }
  };

  const handleSuspendOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to suspend this order?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!response.ok) throw new Error("Failed to suspend order.");
        setOrders(orders.filter((order) => order.id !== orderId));
      } catch (error) {
        console.error("Error suspending order:", error);
        setError("Could not suspend order. Please try again later.");
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update order status.");
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Could not update status. Please try again later.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex justify-between items-center mt-4">
        <Input
          type="search"
          placeholder="Search by customer contact..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <Button onClick={() => setShowModal(true)} className="bg-blue-500 text-white rounded-full transition duration-200 hover:bg-blue-600">
          Add New Order
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex space-x-4">
          {["All", "Fulfilled", "Pending", "Declined"].map((status) => (
            <Button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1 rounded ${selectedStatus === status ? "bg-gray-700 text-white" : "bg-gray-300"}`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading orders...</p>
      ) : (
        <Table className="mt-4">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Contact</th>
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
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <Badge
                      label={order.status}
                      color={
                        order.status === "Fulfilled" ? "bg-green-500" :
                        order.status === "Pending" ? "bg-yellow-500" : 
                        "bg-red-500"
                      }
                    />
                  </td>
                  <td>${order.amount.toFixed(2)}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>
                    <Button size="sm" className="bg-gray-300">View</Button>
                    <Button size="sm" variant="danger" className="ml-2" onClick={() => handleSuspendOrder(order.id)}>Suspend</Button>
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
      )}

      {/* Modal for adding new order */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3 className="text-lg font-semibold mb-4 text-center">Add New Order</h3>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Contact</label>
            <Input
              type="text"
              value={newOrder.customer}
              onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
              placeholder="Enter customer contact"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Status</label>
            <select
              value={newOrder.status}
              onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
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
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Date</label>
            <Input
              type="date"
              value={newOrder.date}
              onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
            />
          </div>
          <div className="flex justify-end mt-6">
            <Button onClick={handleAddOrder} className="bg-blue-500 text-white rounded px-4 py-2">Add Order</Button>
            <Button onClick={() => setShowModal(false)} className="bg-gray-300 ml-2 px-4 py-2">Cancel</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminOrders;
