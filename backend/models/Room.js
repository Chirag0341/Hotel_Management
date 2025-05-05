const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: Number,
  type: String,
  price: Number,
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', roomSchema);
