// src/data/dashboardData.js
import axios from "axios";

// Function to fetch total revenue
export const getTotalRevenue = async () => {
  const response = await axios.get("/api/orders/revenue");
  return response.data.totalRevenue;
};

// Function to fetch recent orders
export const getRecentOrders = async (filter = "all") => {
  const response = await axios.get(`/api/orders/recent?filter=${filter}`);
  return response.data.orders;
};

// Function to fetch new customers count for the current month
export const getNewCustomers = async () => {
  const response = await axios.get("/api/users/new-customers");
  return response.data.newCustomers;
};
