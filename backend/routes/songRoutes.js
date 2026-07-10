const express = require('express');
const router = express.Router();
const { uploadSong, getApprovedSongs, incrementPlayCount, searchTracks } = require('../controllers/songController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadTrackAssets } = require('../middleware/uploadMiddleware');

// Public streaming catalog and searching routes
router.get('/', getApprovedSongs);
router.get('/search', searchTracks);
router.put('/:id/play', incrementPlayCount);

// Uploading a track (Protected: Only registered 'artist' accounts can access this)
router.post('/upload', protect, authorize('artist'), uploadTrackAssets, uploadSong);

module.exports = router;
