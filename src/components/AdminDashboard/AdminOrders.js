import { useState, useEffect, useCallback } from "react";
import Button from "../ui/Button";
import Table from "../ui/Table";
import Badge from "../ui/Badge";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import { useAuth } from "../context/AuthContext";
import { FaSync } from 'react-icons/fa';
import Toast from "../ui/Toast"; // Custom Toast Component

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dateFilter, setDateFilter] = useState("weekly");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Fetch all orders
  const fetchOrders = useCallback(async () => {
    setIsRefreshing(true);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) throw new Error("Failed to load orders.");
      const data = await response.json();
      setOrders(data.orders || []); // Expecting data.orders as an array
      setFilteredOrders(data.orders || []);
      setToastMessage({ type: 'success', message: 'Orders loaded successfully.' });
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Could not load orders. Please try again later.");
      setToastMessage({ type: 'error', message: 'Failed to load orders.' });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [user.token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Apply filters based on status, search term, and date range
  useEffect(() => {
    const filterOrders = () => {
      const now = new Date();
      const oneWeekAgo = new Date(now);
      const oneMonthAgo = new Date(now);
      const oneYearAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      oneYearAgo.setFullYear(now.getFullYear() - 1);

      const matchesStatus = (order) => selectedStatus === "All" || order.status === selectedStatus;
      const matchesSearch = (order) => 
        order.userId?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId?.lastName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDate = (order) => {
        const orderDate = new Date(order.createdAt);
        return dateFilter === "weekly" ? orderDate >= oneWeekAgo
          : dateFilter === "monthly" ? orderDate >= oneMonthAgo
          : dateFilter === "yearly" ? orderDate >= oneYearAgo
          : true;
      };

      setFilteredOrders(orders.filter(order => matchesStatus(order) && matchesSearch(order) && matchesDate(order)));
    };
    filterOrders();
  }, [orders, searchTerm, selectedStatus, dateFilter]);

  // Update the status of a specific order
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (!response.ok) throw new Error('Failed to update order status.');
  
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
  
      setToastMessage({ type: 'success', message: 'Order status updated successfully.' });
    } catch (error) {
      console.error("Error updating status:", error);
      setError("Could not update status. Please try again later.");
      setToastMessage({ type: 'error', message: 'Failed to update order status.' });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {toastMessage && (
        <Toast message={toastMessage.message} onClose={() => setToastMessage(null)} />
      )}

      <div className="flex justify-between items-center mb-4">
        <Input
          type="search"
          placeholder="Search by customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
        <div className="flex flex-wrap gap-2">
          {["All", "Pending", "In Progress", "Fulfilled", "On Hold", "Cancelled", "Failed"].map((status) => (
            <Button key={status} onClick={() => setSelectedStatus(status)}>
              {status}
            </Button>
          ))}
          <select
            className="border rounded-md px-4 py-2 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <Button onClick={fetchOrders} 
          className="bg-navy hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors duration-200 flex items-center gap-2 shadow-sm"
          disabled={isRefreshing}>
            <FaSync className= {isRefreshing ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading orders...</p>
      ) : (
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
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : 'Unknown'}</td>
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
                  <td>${order.total?.toFixed(2) || 'N/A'}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Button size="sm" onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderModal(true);
                    }}>View</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {showOrderModal && selectedOrder && (
        <Modal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} title="Order Details">
          <div>
            <p>Customer: {selectedOrder.userId ? `${selectedOrder.userId.firstName} ${selectedOrder.userId.lastName}` : 'Unknown'}</p>
            <p>Status: {selectedOrder.status}</p>
            <p>Amount: ${selectedOrder.total?.toFixed(2)}</p>
            <p>Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="mt-4">
            <select
              className="border rounded px-3 py-2"
              value={selectedOrder.status}
              onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
            >
              {["Pending", "In Progress", "Fulfilled", "On Hold", "Cancelled", "Failed"].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <Button onClick={() => setShowOrderModal(false)} className="bg-blue-500 text-white mt-4">Close</Button>
        </Modal>
      )}
    </div>
  );
};

export default AdminOrders;
