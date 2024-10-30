// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Ensure these are functions
const { getUserProfile, updateUserProfile, deleteUserAccount } = require('../controllers/userController'); // Import specific functions

// Define routes for user profile management
router.get('/profile', protect, getUserProfile);       // Protect is a middleware function
router.put('/profile', protect, updateUserProfile);    // Route handler is a function

router.delete('/profile', protect, deleteUserAccount); // Delete account

module.exports = router;
