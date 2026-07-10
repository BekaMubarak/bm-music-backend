const Song = require('../models/Song');
const User = require('../models/User');

exports.getPendingSongs = async (req, res) => {
  try {
    const songs = await Song.find({ isApproved: false }).populate('artist', 'name email');
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!song) return res.status(404).json({ success: false, message: 'Song not found' });
    res.status(200).json({ success: true, message: 'Track approved successfully and is now streaming live!', data: song });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSystemAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalArtists = await User.countDocuments({ role: 'artist' });
    const totalSongs = await Song.countDocuments();
    
    const playStats = await Song.aggregate([
      { $group: { _id: null, totalStreams: { $sum: '$plays' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        users: totalUsers,
        artists: totalArtists,
        songs: totalSongs,
        totalPlays: playStats[0] ? playStats[0].totalStreams : 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
