// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  summary: { type: String, required: true }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
