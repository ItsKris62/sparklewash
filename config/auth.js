const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// Generate a JWT token with user ID and role, expires in 1 day
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId},
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Middleware to protect routes, only accessible to authenticated users
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach user to request, excluding password
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }

      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401);
      throw new Error('Invalid token');
    }
  } else {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
});

// Middleware to restrict routes to admin users only
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};

// Middleware to restrict routes to regular users only
const user = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next();
  } else {
    res.status(403).json({ message: 'User access only' });
  }
};

// Middleware to validate the JWT token
const validateToken = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ valid: true });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = {
  generateToken,
  protect,
  admin,
  user,
  validateToken,
};
