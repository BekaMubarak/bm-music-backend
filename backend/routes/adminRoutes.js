const express = require('express');
const router = express.Router();
const { getPendingSongs, approveSong, getSystemAnalytics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes here are locked down tightly. Only users with the 'admin' role can enter.
router.get('/songs/pending', protect, authorize('admin'), getPendingSongs);
router.put('/songs/:id/approve', protect, authorize('admin'), approveSong);
router.get('/analytics', protect, authorize('admin'), getSystemAnalytics);

module.exports = router;
