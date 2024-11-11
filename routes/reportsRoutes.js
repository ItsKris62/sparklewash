// routes/reports.js
const express = require('express');
const router = express.Router();
const { getMonthlyReports } = require('../controllers/reportsController');
const { protect, admin } = require('../middleware/authMiddleware');


// Route to get monthly reports (admin only)
router.get('/', protect, admin, getMonthlyReports);

module.exports = router;
