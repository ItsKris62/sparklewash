// controllers/analyticsController.js
const User = require('../models/User');
const Order = require('../models/Order');

exports.getAnalyticsData = async (req, res) => {
  try {
    // 1. Total Users Count
    const totalUsers = await User.countDocuments();

    // 2. Total Orders Count
    const totalOrders = await Order.countDocuments();

    // 3. Monthly Revenue Calculation
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const monthlyRevenueData = await Order.aggregate([
      {
        $match: { createdAt: { $gte: startOfMonth } }
      },
      {
        $group: {
          _id: null,
          monthlyRevenue: { $sum: "$total" }
        }
      }
    ]);

    const monthlyRevenue = monthlyRevenueData[0]?.monthlyRevenue || 0;

    // 4. Active Users Calculation (assuming recent logins are within last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    const activeUsers = await User.countDocuments({ updatedAt: { $gte: last30Days } });

    // 5. Revenue per Service Calculation
    const servicesRevenue = await Order.aggregate([
      {
        $group: {
          _id: "$service", // Group by the service name in the Order model
          revenue: { $sum: "$total" }
        }
      },
      { $sort: { revenue: -1 } }
    ]);

    // Send analytics data as response
    res.json({
      totalUsers,
      totalOrders,
      monthlyRevenue,
      activeUsers,
      allServicesRevenue: servicesRevenue
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
};
