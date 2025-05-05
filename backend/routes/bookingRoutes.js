const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticate = require('../middleware/auth');

router.post('/book', authenticate, bookingController.bookRoom);

module.exports = router;
