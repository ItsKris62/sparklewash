const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { 
    loginUser, 
    registerUser, 
    getProfile, 
    updateProfile,
    verifyToken,
    verifyAdmin 
} = require('../controllers/authController');

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Token verification routes
router.get('/verify', protect, verifyToken);
router.get('/admin/verify', protect, admin, verifyAdmin);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;