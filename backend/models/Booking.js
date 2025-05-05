const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  roomId: mongoose.Schema.Types.ObjectId,
  checkInDate: String,
  checkOutDate: String
});

module.exports = mongoose.model('Booking', bookingSchema);
