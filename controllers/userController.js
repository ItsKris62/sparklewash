// controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const logAction = require('../middleware/logMiddleware');
const { ApiError } = require('../middleware/errorMiddleware')

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password'); // Exclude password
  if (user) {
    res.json(user);

    // Log action
    logAction(
      'User profile accessed',
      'user',
      `User ${req.user.id} accessed their profile`
    )(req, res, () => {});

  } else {
    res.status(404);
    throw new ApiError('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.countryCode = req.body.countryCode || user.countryCode;
    user.contact = req.body.contact || user.contact;
    user.location = req.body.location || user.location;

    // If password is being updated, hash the new password
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      countryCode: updatedUser.countryCode,
      contact: updatedUser.contact,
      location: updatedUser.location,
      role: updatedUser.role,
      status: updatedUser.status,
    });

    // Log profile update
    logAction(
      'User profile updated',
      'user',
      `User ${req.user.id} updated their profile`
    )(req, res, () => {});    
  } else {
    res.status(404);
    throw new ApiError('User not found');
  }
});

// @desc    Delete user account
// @route   DELETE /api/users/profile
// @access  Private
exports.deleteUserAccount = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    await user.remove();
    res.json({ message: 'Account deleted successfully' });
    // Log account deletion
    logAction(
      'User account deleted',
      'user',
      `User ${req.user.id} deleted their account`
    )(req, res, () => {});
  } else {
    res.status(404);
    throw new ApiError('User not found');
  }
});

// @desc    Get all users (Admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password'); // Exclude password for security
  res.json(users);

  // Log action
  logAction(
    'All users fetched',
    'system',
    `Admin ${req.user.id} fetched all users`
  )(req, res, () => {});
});

// Get Users Created in the Current Month
exports.getNewCustomers = asyncHandler(async (req, res) => {
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  
  const users = await User.find({ createdAt: { $gte: startOfMonth } });
  res.json({ newCustomers: users.length });
   // Log action
   logAction(
    'New customers fetched',
    'system',
    `Admin ${req.user.id} fetched new customers count`
  )(req, res, () => {});
});

// @desc    Update user status (Admin only)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
exports.updateUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.status = req.body.status;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      status: updatedUser.status,
      role: updatedUser.role,
    });
    // Log status update
    logAction(
      'User status updated',
      'user',
      `Admin ${req.user.id} updated status of user ${user._id} to ${user.status}`
    )(req, res, () => {});
  } else {
    res.status(404);
    throw new ApiError('User not found');
  }
});

// @desc    Delete a user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });


    // Log user deletion
    logAction(
      'User deleted',
      'user',
      `Admin ${req.user.id} deleted user ${user._id}`
    )(req, res, () => {});
  } else {
    res.status(404);
    throw new ApiError('User not found');
  }
});
