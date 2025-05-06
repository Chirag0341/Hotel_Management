const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authenticate = require('../middleware/auth');

router.post('/add', authenticate, roomController.addRoom);
router.get('/available', roomController.getAvailableRooms);
router.get('/booked_rooms', roomController.getBookedRooms);
router.get('/all_rooms', roomController.getAllRooms);
router.put('/update-price/:id', roomController.updateRoomPrice);
router.put('/force-checkout/:id', roomController.forceCheckout);
module.exports = router;
