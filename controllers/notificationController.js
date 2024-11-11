// controllers/notificationController.js
const Notification = require('../models/Notification'); // Assuming a Notification model is available

// Fetch notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(10); // Fetch recent notifications
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

// Clear notifications for a specific user
exports.clearNotifications = async (req, res) => {
  try {
    await Notification.clearNotifications(req.user._id);
    res.status(200).json({ message: 'Notifications cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear notifications' });
  }
};
