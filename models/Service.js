// models/Service.js
const mongoose = require('mongoose');

const extraServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  additionalServices: [extraServiceSchema] // Array of additional services with prices
});

module.exports = mongoose.model('Service', serviceSchema);
