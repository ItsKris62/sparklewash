const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getUserPoints,
    addPoints,
    usePoints,
    getPointsHistory
} = require('../controllers/pointsController');

// All routes are protected
router.use(protect);

router.get('/', getUserPoints);
router.post('/add', addPoints);
router.post('/use', usePoints);
router.get('/history', getPointsHistory);

module.exports = router;