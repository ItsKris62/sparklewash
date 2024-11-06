const User = require('../models/User');
const { ApiError } = require('../middleware/errorMiddleware');
const generateToken = require('../utils/generateToken');

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status,
                token: generateToken(user._id),
            });
        } else {
            throw new ApiError(401, 'Invalid email or password');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new ApiError(400, 'User already exists');
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role: 'user',
            status: 'active',
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status,
                token: generateToken(user._id),
            });
        } else {
            throw new ApiError(400, 'Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            throw new ApiError(404, 'User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                role: updatedUser.role,
                status: updatedUser.status,
                token: generateToken(updatedUser._id),
            });
        } else {
            throw new ApiError(404, 'User not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Verify user token
// @route   GET /api/auth/verify
// @access  Private
const verifyToken = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            status: user.status,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify admin status
// @route   GET /api/auth/admin/verify
// @access  Private/Admin
const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (user.role !== 'admin') {
            throw new ApiError(403, 'Not authorized as admin');
        }

        res.json({
            success: true,
            message: 'Admin verified',
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    verifyToken,
    verifyAdmin,
};
