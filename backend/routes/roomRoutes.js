const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authenticate = require('../middleware/auth');

router.post('/add', authenticate, roomController.addRoom);
router.get('/available', roomController.getAvailableRooms);

module.exports = router;
