// routes/orderRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createOrder, getUserOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/', protect, createOrder); // Use createOrder from controller

// New route to fetch user-specific orders
router.get('/:userId', protect, getUserOrders); 

module.exports = router;
