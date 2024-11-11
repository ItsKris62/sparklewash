// controllers/orderController.js
const Order = require('../models/Order');
const Notification = require('../models/Notification');
const logAction = require('../middleware/logMiddleware');
const { ApiError } = require('../middleware/errorMiddleware');
let io; // Socket.io instance

function initOrderController(socketInstance){
    io = socketInstance;
}

// @desc    Get user orders
// @route   GET /api/orders/:userId
// @access  Private
const getUserOrders = async (req, res, next) => {
  try {
      const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
      res.json(orders);

      // Log user order retrieval
      logAction(
        'Retrieved user orders',
        'user',
        `User ${req.user._id} fetched their orders`
      )(req, res, () => {});

  } catch (error) {
      next(error);
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
    try {
        const { service, location, rooms, fabrics, extras, total, paymentMethod } = req.body;

        if (!service) throw new ApiError(400, 'Service field is required.');

        // Duplicate check for recent orders with same details from the same user
        const recentOrder = await Order.findOne({
            userId: req.user._id,
            service,
            location,
            rooms,
            fabrics,
            total,
            paymentMethod,
            createdAt: { $gte: new Date(Date.now() - 60 * 1000) } // Last 1 minute
        });

        if (recentOrder) {
            throw new ApiError(409, 'Duplicate order detected. Please wait before retrying.');
        }
        
        const order = await Order.create({
            userId: req.user._id,
            service,
            location,
            rooms,
            fabrics,
            extras,
            total,
            paymentMethod,
            points: Math.floor(total * 0.1),
            status: 'Pending'
        });

        // Notify admin of new order
        const notificationMessage = `New order placed by ${req.user.name}`;
        const adminNotification = await Notification.createNotification(notificationMessage, 'order', req.user._id);
        
        // Emit notification to admins
        if (io) io.emit('notification', adminNotification);

        // Log order creation
        await logAction(
          'Order created',
          'order',
          `Order #${order._id} created by user ${req.user._id}`,
          { orderId: order._id }
        )(req, res, () => {});

        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/order/:id
// @access  Private
const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) throw new ApiError(404, 'Order not found');
        if (order.userId.toString() !== req.user._id.toString()) throw new ApiError(403, 'Not authorized to access this order');
        res.json(order);

        // Log order retrieval
        await logAction(
          'Order retrieved',
          'order',
          `User ${req.user._id} retrieved order #${order._id}`,
          { orderId: order._id }
        )(req, res, () => {});
    } catch (error) {
        next(error);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) throw new ApiError(404, 'Order not found');
        if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
            throw new ApiError(403, 'Not authorized to update this order');
        }

        // Update order status and add log entry
        order.status = status;
        order.orderLogs.push({
            status,
            changedAt: new Date(),
            changedBy: req.user._id
        });

        const updatedOrder = await order.save();

        // Notify user of order status change
        const notificationMessage = `Your order #${order._id} status changed to ${status}`;
        const userNotification = await Notification.createNotification(notificationMessage, 'update', order.userId);
        if (io) io.emit('notification', userNotification);

        // Log order status update
        await logAction(
          'Order status updated',
          'order',
          `Order #${order._id} status changed to ${status} by ${req.user._id}`,
          { orderId: order._id }
        )(req, res, () => {});

        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserOrders,
    createOrder,
    getOrderById,
    updateOrderStatus,
    initOrderController
};
