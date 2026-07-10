const express = require('express');
const router = express.Router();
const { getUserPlaylists, createPlaylist } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Both routes are protected because playlists belong to specific logged-in users
router.get('/playlists', protect, getUserPlaylists);
router.post('/playlists', protect, createPlaylist);

module.exports = router;
