const Room = require('../models/Room');

exports.addRoom = async (req, res) => {
  const { number, type, price, isAvailable } = req.body;
  const room = new Room({ number, type, price, isAvailable });

  await room.save();
  res.status(201).json({ message: 'Room added successfully' });
};

exports.getAvailableRooms = async (req, res) => {
  const rooms = await Room.find({ isAvailable: true });
  res.json(rooms);
};
