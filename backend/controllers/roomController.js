const Room = require('../models/Room');
const Booking = require('../models/Booking');
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

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching all rooms:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getBookedRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isBookings: true});
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching all rooms:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forceCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    
    const room = await Room.findByIdAndUpdate(
      id,
      { isAvailable: true },
      { new: true }
    );
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Find and update any active bookings for this room
    await Booking.updateMany(
      { room: id, active: true },
      { active: false }
    );
    
    res.json({ message: 'Room checkout forced successfully' });
  } catch (error) {
    console.error('Error forcing checkout:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateRoomPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    
    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ message: 'Invalid price' });
    }
    
    const room = await Room.findByIdAndUpdate(
      id, 
      { price: Number(price) }, 
      { new: true }
    );
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    // Also update price in any active bookings for this room
    await Booking.updateMany(
      { 'room': id, 'active': true },
      { 'room.price': Number(price) }
    );
    
    res.json({ message: 'Price updated successfully' });
  } catch (error) {
    console.error('Error updating room price:', error);
    res.status(500).json({ message: 'Server error' });
  }
};