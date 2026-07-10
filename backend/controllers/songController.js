const Song = require('../models/Song');

exports.uploadSong = async (req, res) => {
  try {
    const { title, genre, albumId } = req.body;
    
    // Ensure both files were fully passed through by the upload middleware
    if (!req.files || !req.files.audio || !req.files.cover) {
      return res.status(400).json({ success: false, message: 'Both master audio and cover artwork files are required' });
    }

    // Extract file hosting URLs sent back by Cloudinary
    const audioUrl = req.files.audio[0].path;
    const coverUrl = req.files.cover[0].path;

    const song = await Song.create({
      title,
      genre,
      album: albumId || null,
      artist: req.user._id,
      audioUrl,
      coverUrl,
      isApproved: false // Marked unapproved until verified by an admin
    });

    res.status(201).json({ 
      success: true, 
      data: song, 
      message: 'Track media successfully uploaded and submitted for administrator review!' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getApprovedSongs = async (req, res) => {
  try {
    // Only fetch songs approved by the admin team, appending author profile info
    const songs = await Song.find({ isApproved: true }).populate('artist', 'name avatar');
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.incrementPlayCount = async (req, res) => {
  try {
    // Mathematically increments ($inc) play counts when a user hits play
    const song = await Song.findByIdAndUpdate(req.params.id, { $inc: { plays: 1 } }, { new: true });
    if (!song) return res.status(404).json({ success: false, message: 'Target track not found' });
    res.status(200).json({ success: true, plays: song.plays });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchTracks = async (req, res) => {
  try {
    const query = req.query.q;
    // Uses Mongoose text indexes to search for terms across titles and genres
    const songs = await Song.find({
      isApproved: true,
      $text: { $search: query }
    }).populate('artist', 'name avatar');
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

