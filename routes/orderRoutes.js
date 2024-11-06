const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController');

// Protected routes - all routes require authentication
router.use(protect);

// User routes
router.post('/', createOrder);
router.get('/:userId', getUserOrders); // Changed to match frontend request
router.get('/order/:id', getOrderById);
router.put('/:id', updateOrderStatus);

module.exports = router;