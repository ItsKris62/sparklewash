const Points = require('../models/Points');
const { ApiError } = require('../middleware/errorMiddleware');

// Get user points
const getUserPoints = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            throw new ApiError(401, 'User not authenticated');
        }

        let userPoints = await Points.findOne({ user: req.user._id });
        
        if (!userPoints) {
            // If no points record exists, create one
            userPoints = await Points.create({
                user: req.user._id,
                points: 0,
                history: []
            });
        }

        res.json({
            success: true,
            points: userPoints.points,
            history: userPoints.history
        });
    } catch (error) {
        console.error('Points fetch error:', error);
        next(error);
    }
};

// Add points
const addPoints = async (req, res, next) => {
    try {
        const { points, description } = req.body;
        
        let userPoints = await Points.findOne({ user: req.user._id });
        
        if (!userPoints) {
            userPoints = new Points({
                user: req.user._id,
                points: 0,
                history: []
            });
        }

        userPoints.points += points;
        userPoints.history.push({
            points,
            description,
            type: 'earned'
        });

        await userPoints.save();

        res.json({
            success: true,
            currentPoints: userPoints.points,
            added: points
        });
    } catch (error) {
        next(error);
    }
};

// Use points
const usePoints = async (req, res, next) => {
    try {
        const { points, description } = req.body;
        
        let userPoints = await Points.findOne({ user: req.user._id });
        
        if (!userPoints || userPoints.points < points) {
            throw new ApiError(400, 'Insufficient points');
        }

        userPoints.points -= points;
        userPoints.history.push({
            points,
            description,
            type: 'spent'
        });

        await userPoints.save();

        res.json({
            success: true,
            currentPoints: userPoints.points,
            used: points
        });
    } catch (error) {
        next(error);
    }
};

// Get points history
const getPointsHistory = async (req, res, next) => {
    try {
        const userPoints = await Points.findOne({ user: req.user._id });
        
        if (!userPoints) {
            return res.json({
                history: []
            });
        }

        res.json({
            history: userPoints.history
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserPoints,
    addPoints,
    usePoints,
    getPointsHistory
};