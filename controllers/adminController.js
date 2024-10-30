// controllers/adminController.js
const User = require('../models/User');
const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

// Fetch all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, 'firstName lastName email role status');
  res.json(users);
});

// Update user status
exports.updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const user = await User.findById(id);
  if (user) {
      user.status = status;
      await user.save();
      res.json({ message: `User status updated to ${status}` });
  } else {
      res.status(404);
      throw new Error('User not found');
  }
});

// Get all orders with user information populated
exports.getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'firstName lastName email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
