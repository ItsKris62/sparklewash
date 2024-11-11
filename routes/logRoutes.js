// routes/logRoutes.js
const express = require('express');
const router = express.Router();
const {getLogs, exportLogs, createLog} = require('../controllers/logController');

router.get('/', getLogs);           // Fetch logs

router.get('/export', exportLogs);  // Route to export logs as CSV

// Add a route to handle log creation
router.post('/api/logs', createLog); // Ensure this matches your intended endpoint


module.exports = router;
