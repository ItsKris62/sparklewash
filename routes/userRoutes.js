// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Ensure these are functions
const { getUserProfile, updateUserProfile, deleteUserAccount } = require('../controllers/userController'); // Import specific functions
const { getNewCustomers } = require('../controllers/userController');

// Define routes for user profile management
router.get('/profile', protect, getUserProfile);       // Protect is a middleware function
router.put('/profile', protect, updateUserProfile);    // Route handler is a function

router.delete('/profile', protect, deleteUserAccount); // Delete account

router.get('/new-customers', getNewCustomers);

// route to get user points
router.get('/points', protect, async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select('points');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ points: user.points || 0 });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

module.exports = router;
