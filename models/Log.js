// models/Log.js
const mongoose = require('mongoose');

// Define the Log schema
const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the current date and time
    required: true
  },
  action: {
    type: String,
    required: true,
    trim: true // Remove any trailing spaces
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to a User document
    required: false // Optional field to log which user performed the action
  },
  // Any additional metadata for specific log entries can go here
  metadata: {
    type: Map,
    of: String, // Stores additional key-value information if needed
    required: false
  }
});

// Define the Log model
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
