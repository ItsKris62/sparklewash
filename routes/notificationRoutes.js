// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { getNotifications } = require('../controllers/notificationController');

router.get('/notifications', getNotifications); // Fetch latest notifications

module.exports = router;
