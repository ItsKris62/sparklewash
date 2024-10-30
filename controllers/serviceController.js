// controllers/serviceController.js
const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

// Fetch all services
exports.getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  res.json(services);
});
