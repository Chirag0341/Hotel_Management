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

exports.getBookingsForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ userId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    // Fetch room details externally for each booking
    const bookingsWithRoomDetails = await Promise.all(
      bookings.map(async (booking) => {
        const room = await Room.findById(booking.roomId); // Fetch room details using roomId
        return {
          id: booking._id,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          room: room
            ? {
                id: room._id,
                type: room.type,
                number: room.number,
                price: room.price,
                isAvailable: room.isAvailable,
              }
            : null, // Handle case where room is not found
        };
      })
    );
    res.json(bookingsWithRoomDetails);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

exports.getBookingfromHotel = async (req, res) => {
  //find all booked rooms deatils from database 
  try {
    const bookings = await Booking.find();
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    // Fetch room details externally for each booking
    const bookingsWithRoomDetails = await Promise.all(
      bookings.map(async (booking) => {
        const room = await Room.findById(booking.roomId); // Fetch room details using roomId
        return {
          id: booking._id,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          room: room
            ? {
                id: room._id,
                type: room.type,
                number: room.number,
                price: room.price,
                isAvailable: room.isAvailable,
              }
            : null, // Handle case where room is not found
        };
      })
    );
    res.json(bookingsWithRoomDetails);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

// filepath: /Users/apple/code/Project/6th_sem/SADP/backend/controllers/bookingController.js
exports.checkoutBooking = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    const userId = req.user.id;

    // Find the booking
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if booking belongs to user or user is admin
    if (booking.userId.toString() !== userId && req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update booking status
    booking.active = false;
    await booking.save();

    // Update room availability
    const room = await Room.findById(booking.roomId);
    if (room) {
      room.isAvailable = true;
      await room.save();
    }

    res.json({ message: 'Checkout successful' });
  } catch (error) {
    console.error('Error checking out:', error);
    res.status(500).json({ message: 'Failed to check out' });
  }
};