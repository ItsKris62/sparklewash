// This file can contain functions or mock data related to dashboard statistics:

// data/dashboardData.js

// Mock data for total revenue
export const getTotalRevenue = () => {
    return {
      total: 150000,
      month: 5000,
    };
  };
  
  // Mock data for recent orders
  export const getRecentOrders = () => {
    return [
      { id: 1, customer: 'John Doe', amount: 150, status: 'Completed' },
      { id: 2, customer: 'Jane Smith', amount: 200, status: 'Pending' },
      { id: 3, customer: 'Mary Johnson', amount: 350, status: 'Completed' },
      { id: 4, customer: 'James Brown', amount: 75, status: 'Cancelled' },
    ];
  };