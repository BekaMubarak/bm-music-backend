const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverUrl: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  genre: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
