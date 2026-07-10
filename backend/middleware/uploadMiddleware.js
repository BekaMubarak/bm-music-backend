const multer = require('multer');
const { storage } = require('../config/cloudinary');

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // Sets a strict 20MB file limit per track upload
  }
});

// Configure explicit fields for handling audio and image files at the same time
const uploadTrackAssets = upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'cover', maxCount: 1 }
]);

module.exports = { upload, uploadTrackAssets };
