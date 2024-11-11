// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { getNotifications, clearNotifications } = require('../controllers/notificationController');

// Ensure that the endpoint matches the one being called in your frontend
router.get('/', getNotifications); // Matches /api/notifications in the frontend
router.post('/clear', clearNotifications); // Additional route to clear notifications

module.exports = router;
