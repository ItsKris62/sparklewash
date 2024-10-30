// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, getOrders } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const { updateUserStatus } = require('../controllers/adminController'); // Add this import

router.get('/users', protect, admin, getAllUsers); // GET all users
router.get('/orders', protect, admin, getOrders); // GET all orders
router.put('/users/:id/status', protect, admin, updateUserStatus); // Update user status



module.exports = router;
