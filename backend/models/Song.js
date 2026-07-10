const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  audioUrl: { type: String, required: true },
  coverUrl: { type: String, required: true },
  genre: { type: String, required: true, index: true },
  plays: { type: Number, default: 0 },
  isApproved: { type: Boolean, default: false } // Requires admin validation before going public
}, { timestamps: true });

// Indexes allow lightning-fast text searching across your library
songSchema.index({ title: 'text', genre: 'text' });

module.exports = mongoose.model('Song', songSchema);
