const express = require('express');
const { getRecommendations } = require('../controllers/matchController');
const {
  sendRequest,
  getIncoming,
  getSent,
  acceptRequest,
  declineRequest,
} = require('../controllers/connectController');
const protect = require('../middleware/auth');

const router = express.Router();

// ─── Recommendations ─────────────────────────────────────────
router.get('/recommendations', protect, getRecommendations);
router.get('/matches', protect, getRecommendations);

// ─── Connect Requests ─────────────────────────────────────────
// POST   /api/match/connect/:userId      — send a request
// GET    /api/match/requests             — incoming requests (to me)
// GET    /api/match/requests/sent        — requests I sent (for button state)
// PUT    /api/match/requests/:id/accept  — accept a request
// PUT    /api/match/requests/:id/decline — decline a request
router.post('/connect/:userId', protect, sendRequest);
router.get('/requests', protect, getIncoming);
router.get('/requests/sent', protect, getSent);
router.put('/requests/:id/accept', protect, acceptRequest);
router.put('/requests/:id/decline', protect, declineRequest);

module.exports = router;
