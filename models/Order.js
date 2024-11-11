// models/Order.js
const mongoose = require('mongoose');

const extraServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const orderLogSchema = new mongoose.Schema({
  status: String,
  changedAt: { type: Date, default: Date.now },
  changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true },
  location: { type: String },
  rooms: { type: Number },
  fabrics: { type: String },
  extras: [extraServiceSchema], // Tracking name and price for each extra service
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Pay on Delivery - Cash', 'Pay on Pickup - Cash', 'Pay on Delivery - MPESA'] },
  points: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Fulfilled', 'On Hold', 'Cancelled', 'Failed'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }, // Tracks the creation time
  modifiedAt: { type: Date, default: Date.now }, // Tracks the last modification time
  orderLogs: [orderLogSchema]
});

// Update modifiedAt every time the document is saved (except creation)
orderSchema.pre('save', function(next) {
  if (!this.isNew) {
    this.modifiedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
