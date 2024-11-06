const mongoose = require('mongoose');

const pointsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Add index for faster lookups
    },
    points: {
        type: Number,
        default: 0
    },
    history: [{
        points: Number,
        description: String,
        type: {
            type: String,
            enum: ['earned', 'spent'],
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// Add compound index for user and points
pointsSchema.index({ user: 1, points: 1 });

const Points = mongoose.model('Points', pointsSchema);

module.exports = Points;