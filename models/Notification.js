// models/Notification.js

const mongoose = require('mongoose');

// Define the Notification schema
const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['order', 'system', 'user', 'update'], // Example types of notifications
        default: 'system',
    },
    isRead: {
        type: Boolean,
        default: false, // Unread by default
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model, if needed
        required: false,
    },
});

// Static method to create a new notification
notificationSchema.statics.createNotification = async function (message, type = 'system', user = null) {
    const notification = new this({ message, type, user });
    await notification.save();
    return notification;
};

// Static method to fetch all unread notifications
notificationSchema.statics.getUnreadNotifications = async function () {
    return await this.find({ isRead: false }).sort({ createdAt: -1 });
};

// Static method to mark a notification as read
notificationSchema.statics.markAsRead = async function (id) {
    return await this.findByIdAndUpdate(id, { isRead: true }, { new: true });
};

// Add a clear notifications method
notificationSchema.statics.clearNotifications = async function(userId) {
    return await this.updateMany({ user: userId }, { isRead: true });
  };

// Model export
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
