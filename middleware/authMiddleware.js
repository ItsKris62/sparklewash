const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ApiError } = require('./errorMiddleware');

const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                throw new ApiError(401, 'Not authorized, user not found');
            }

            if (req.user.status !== 'active') {
                throw new ApiError(401, 'Account is not active');
            }

            next();
        } else {
            throw new ApiError(401, 'Not authorized, no token');
        }
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new ApiError(401, 'Not authorized, invalid token'));
        } else if (error.name === 'TokenExpiredError') {
            next(new ApiError(401, 'Not authorized, token expired'));
        } else {
            next(error);
        }
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        next(new ApiError(403, 'Not authorized as admin'));
    }
};

module.exports = { protect, admin };