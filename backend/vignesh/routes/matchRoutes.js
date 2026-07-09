const express = require('express');
const { getRecommendations } = require('../controllers/matchController');
const protect = require('../middleware/auth');

const router = express.Router();

router.get('/recommendations', protect, getRecommendations);
router.get('/matches', protect, getRecommendations);

module.exports = router;
