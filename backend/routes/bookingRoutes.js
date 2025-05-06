const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticate = require('../middleware/auth');

router.post('/book', authenticate, bookingController.bookRoom);
router.get('/booked_rooms', authenticate, bookingController.getBookingsForUser);
router.put('/checkout/:id', bookingController.checkoutBooking);
router.get('/all_bookings', bookingController.getBookingfromHotel);
module.exports = router;
