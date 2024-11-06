const logger = require('../utils/logger');

// Custom error class for API errors
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Handle specific known errors
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new ApiError(400, message);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ApiError(400, message);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ApiError(400, message);
};

const handleJWTError = () => 
  new ApiError(401, 'Invalid token. Please log in again.');

const handleJWTExpiredError = () => 
  new ApiError(401, 'Your token has expired. Please log in again.');

const handlePointsError = (err) => {
  if (err.message === 'Insufficient points') {
    return new ApiError(400, 'Insufficient points available');
  }
  return new ApiError(500, 'Error processing points');
};

// Main error handling middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // Development error response
    logger.error('Error details:', {
      status: err.status,
      statusCode: err.statusCode,
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString()
    });

    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production error handling
    let error = { ...err };
    error.message = err.message;

    // Handle specific error types
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    if (error.message.includes('points')) error = handlePointsError(error);

    // Operational, trusted error: send message to client
    if (error.isOperational) {
      logger.error('Operational error:', {
        statusCode: error.statusCode,
        message: error.message,
        path: req.path,
        method: req.method
      });

      res.status(error.statusCode).json({
        status: error.status,
        message: error.message
      });
    } else {
      // Programming or other unknown error: don't leak error details
      logger.error('Programming error:', {
        error: error,
        path: req.path,
        method: req.method
      });

      res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
      });
    }
  }
};

// 404 handler
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Resource not found - ${req.originalUrl}`);
  next(error);
};

module.exports = {
  ApiError,
  errorHandler,
  notFound
};