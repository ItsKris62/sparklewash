// routes/analyticsRoutes.js
const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const router = express.Router();
const { admin, protect } = require('../middleware/authMiddleware');

const getServiceRevenue = async (req, res) => {
  try {
    const revenueData = await Order.aggregate([
      // Your aggregation logic here
      {
        $group: {
          _id: "$service",
          totalRevenue: { $sum: "$total" }
        }
      }
    ]);
    res.json(revenueData);
  } catch (error) {
    console.error('Error fetching service revenue:', error);
    res.status(500).json({ error: 'Failed to fetch service revenue' });
  }
};

router.get('/services-revenue', getServiceRevenue); // Route for service revenue data


// GET /api/analytics - Fetch analytics data, including top services
router.get('/', protect, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const totalOrders = await Order.countDocuments();

    // Calculate monthly revenue by summing all orders for the current month
    const currentMonthStart = new Date(new Date().setDate(1));
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart },
        },
      },
      { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
    ]);

    // Calculate top 3 services by revenue for the current month
    const topServices = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart },
        },
      },
      {
        $group: {
          _id: "$service",
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 3 },
    ]);

    // Calculate revenue for all services for the current month
    const allServices = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: currentMonthStart },
        },
      },
      {
        $group: {
          _id: "$service",
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { revenue: -1 } },
    ]);

    res.json({
      totalUsers,
      activeUsers,
      totalOrders,
      monthlyRevenue: monthlyRevenue[0]?.totalRevenue || 0,
      topServices,
      allServices,
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

module.exports = router;
