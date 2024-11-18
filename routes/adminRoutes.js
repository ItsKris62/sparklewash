const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  updateUserStatus,
  getOrders,
  getTotalRevenue,
  getNewCustomers,
  getOrderStatusSummary, // Import the function
  getServicePerformance,
} = require('../controllers/adminController');

router.use(protect, admin);

router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);
router.get('/orders', getOrders);
router.get('/total-revenue', getTotalRevenue);
router.get('/new-customers', getNewCustomers);

// Order Status Summary
router.get('/analytics/order-status', getOrderStatusSummary);

// Service Performance Summary
router.get('/analytics/service-performance', getServicePerformance);


module.exports = router;
