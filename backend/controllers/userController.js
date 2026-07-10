const Playlist = require('../models/Playlist');

exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).populate('songs');
    res.status(200).json({ success: true, data: playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const { name, isPrivate } = req.body;
    const playlist = await Playlist.create({
      name,
      isPrivate: isPrivate || false,
      user: req.user._id,
      songs: []
    });
    res.status(201).json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
