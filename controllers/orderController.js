const Order = require('../models/Order');
const { ApiError } = require('../middleware/errorMiddleware');

// @desc    Get user orders
// @route   GET /api/orders/:userId
// @access  Private
const getUserOrders = async (req, res, next) => {
  try {
      const orders = await Order.find({ userId: req.user._id })
          .sort({ createdAt: -1 }); // Sort by newest first

      if (!orders) {
          return res.json([]);
      }

      res.json(orders);
  } catch (error) {
      next(error);
  }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { 
      service, 
      location, 
      rooms, 
      fabrics, 
      extras, 
      total, 
      paymentMethod 
    } = req.body;

    if (!service) {
      throw new ApiError(400, 'Service field is required.');
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
      points: Math.floor(total * 0.1), // Calculate points (10% of total)
      status: 'Pending'
    });

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

        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        // Check if the order belongs to the user
        if (order.userId.toString() !== req.user._id.toString()) {
            throw new ApiError(403, 'Not authorized to access this order');
        }

        res.json(order);
    } catch (error) {
        next(error);
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
const updateOrderStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            throw new ApiError(404, 'Order not found');
        }

        // Allow admins to update any order or user to update their own order
        if (req.user.role !== 'admin' && order.userId.toString() !== req.user._id.toString()) {
            throw new ApiError(403, 'Not authorized to update this order');
        }

        order.status = status;
        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserOrders,
    createOrder,
    getOrderById,
    updateOrderStatus
};