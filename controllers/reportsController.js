// controllers/reportsController.js
const Order = require('../models/Order');
const User = require('../models/User');

exports.getMonthlyReports = async (req, res) => {
  try {
    const { month, year } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of the month

    // Monthly Revenue
    const revenueData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: null,
          monthlyRevenue: { $sum: '$total' },
        },
      },
    ]);
    const monthlyRevenue = revenueData[0]?.monthlyRevenue || 0;

    // Monthly User Engagement (active users)
    const activeUsers = await User.countDocuments({
      updatedAt: { $gte: startDate, $lt: endDate },
    });

    // Monthly Order Completion
    const completedOrders = await Order.countDocuments({
      status: 'Completed',
      createdAt: { $gte: startDate, $lt: endDate },
    });

    // Prepare response data to match frontend expectations
    const response = {
      revenue: {
        date: `${month}/${year}`,
        summary: 'Total revenue generated this month',
        total: monthlyRevenue,
      },
      engagement: {
        date: `${month}/${year}`,
        summary: 'User engagement for the month',
        activeUsers: activeUsers,
      },
      completion: {
        date: `${month}/${year}`,
        summary: 'Order completion rate for the month',
        completionRate: completedOrders,
      },
    };


    res.json({ monthlyRevenue, activeUsers, completedOrders });
  } catch (error) {
    console.error('Error fetching monthly reports:', error);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
};
