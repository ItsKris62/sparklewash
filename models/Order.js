// models/Order.js
const mongoose = require('mongoose');

const extraServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: String, required: true },
  location: { type: String },
  rooms: { type: Number },
  fabrics: { type: String },
  extras: [extraServiceSchema], // Embedded schema for extra services
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Pay on Delivery - Cash', 'Pay on Pickup - Cash', 'Pay on Delivery - MPESA'] },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
