const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.bookRoom = async (req, res) => {
  const { roomId, checkInDate, checkOutDate } = req.body;
  const userId = req.user.id;

  const room = await Room.findById(roomId);
  if (!room || !room.isAvailable)
    return res.status(400).json({ message: 'Room not available' });

  const booking = new Booking({ userId, roomId, checkInDate, checkOutDate });
  await booking.save();

  room.isAvailable = false;
  await room.save();

  res.status(201).json({ message: 'Room booked successfully' });
};
