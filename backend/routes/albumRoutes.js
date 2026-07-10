const express = require('express');
const router = express.Router();
const { createAlbum, getAllAlbums } = require('../controllers/albumController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Route to get all albums (Public)
router.get('/', getAllAlbums);

// Route to create an album (Protected: Artists only, handles a single cover image)
router.post('/', protect, authorize('artist'), upload.single('cover'), createAlbum);

module.exports = router;
