// This file might be responsible for handling order-related data:

// data/ordersData.js

// Mock order data
const orders = [
    { id: 1, userId: 1, items: ['Apple', 'Banana'], total: 30, status: 'Completed' },
    { id: 2, userId: 2, items: ['Orange'], total: 20, status: 'Pending' },
    { id: 3, userId: 1, items: ['Grapes', 'Pineapple'], total: 50, status: 'Completed' },
  ];
  
  // Function to get all orders
  export const getAllOrders = () => {
    return orders;
  };
  
  // Function to find orders by userId
  export const getOrdersByUserId = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };