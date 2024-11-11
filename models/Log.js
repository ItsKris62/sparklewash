const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: false  // Not all logs will have a user associated (e.g., system events)
  },
  action: { type: String, required: true },  // Short description of the action
  path: { type: String, required: true },    // API endpoint or path accessed
  method: { type: String, required: true },  // HTTP method
  description: { type: String },             // Detailed description of the action
  timestamp: { type: Date, default: Date.now },
  status: { type: Number },                  // HTTP status code
  type: { 
    type: String, 
    enum: ['user', 'order', 'system'],       // Classification of log
    required: true 
  },
  metadata: {
    ip: { type: String },                    // IP address of the request
    browser: { type: String },               // Browser info if available
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }  // Order reference for order-related logs
  }
});

module.exports = mongoose.model('Log', logSchema);