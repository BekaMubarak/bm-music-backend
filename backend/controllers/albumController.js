const Album = require('../models/Album');

exports.createAlbum = async (req, res) => {
  try {
    const { title, genre } = req.body;
    if (!req.file) return res.status(400).json({ success: false, message: 'Album cover artwork image is missing' });

    const album = await Album.create({
      title,
      genre,
      artist: req.user._id,
      coverUrl: req.file.path,
      songs: []
    });

    res.status(201).json({ success: true, data: album });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate('artist', 'name').populate('songs');
    res.status(200).json({ success: true, data: albums });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
