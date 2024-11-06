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
  const orders = await Order.find().populate('userId', 'firstName lastName email');
  res.json({ orders });
});

// Get total revenue
exports.getTotalRevenue = asyncHandler(async (req, res) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const revenue = await Order.aggregate([
    { $match: { createdAt: { $gte: new Date(currentYear, currentMonth, 1) } } },
    { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
  ]);

  const previousRevenue = await Order.aggregate([
    { $match: { createdAt: { $gte: new Date(currentYear, currentMonth - 1, 1), $lt: new Date(currentYear, currentMonth, 1) } } },
    { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
  ]);

  res.json({
    totalRevenue: revenue[0]?.totalRevenue || 0,
    previousMonthRevenue: previousRevenue[0]?.totalRevenue || 0
  });
});

// Get new customers for the current and previous month
exports.getNewCustomers = asyncHandler(async (req, res) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newCustomers = await User.countDocuments({ createdAt: { $gte: new Date(currentYear, currentMonth, 1) } });
  const previousNewCustomers = await User.countDocuments({ createdAt: { $gte: new Date(currentYear, currentMonth - 1, 1), $lt: new Date(currentYear, currentMonth, 1) } });

  res.json({
    newCustomersCount: newCustomers,
    previousMonthNewCustomers: previousNewCustomers
  });
});
