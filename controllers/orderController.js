// controllers/orderController.js
const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

// Rewards Points calculation
const calculateOrderPoints = (extras) => {
  const basePoints = 0.5;
  const extraPoints = extras.length * 0.005;
  return basePoints + extraPoints;
};

// Get User Orders
exports.getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

// Create Order
exports.createOrder = asyncHandler(async (req, res) => {
  const { service, location, rooms, fabrics, extras, basePrice, paymentMethod } = req.body;

  // Calculate total, tax, and points
  const extraCost = extras.reduce((sum, extra) => sum + extra.price, 0);
  const subTotal = basePrice + extraCost;
  const tax = subTotal * 0.2;
  const total = subTotal + tax;
  const points = calculateOrderPoints(extras);

  // Create Order
  const order = await Order.create({
    userId: req.user._id,
    service,
    location,
    rooms,
    fabrics,
    extras,
    total,
    paymentMethod,
    points
  });
  // Save Order
  await order.save();

  res.status(201).json({ order, message: 'Order created successfully' });
});
