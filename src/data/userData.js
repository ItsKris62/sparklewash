// This file could handle user-related data for your application:

// data/usersData.js

// Mock user data
const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com', totalOrders: 5, points: 100 },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', totalOrders: 8, points: 200 },
    { id: 3, username: 'mary_johnson', email: 'mary@example.com', totalOrders: 2, points: 50 },
  ];
  
  // Function to get all users
  export const getAllUsers = () => {
    return users;
  };
  
  // Function to find a user by id
  export const getUserById = (id) => {
    return users.find((user) => user.id === id);
  };