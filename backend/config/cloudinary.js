const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'bm_music/others';
    let resource_type = 'auto';

    if (file.mimetype.startsWith('audio/')) {
      folder = 'bm_music/tracks';
      resource_type = 'video'; 
    } else if (file.mimetype.startsWith('image/')) {
      folder = 'bm_music/covers';
      resource_type = 'image';
    }

    return {
      folder: folder,
      resource_type: resource_type,
      allowed_formats: ['mp3', 'wav', 'aac', 'jpg', 'jpeg', 'png', 'webp'],
    };
  },
});

module.exports = { cloudinary, storage };
