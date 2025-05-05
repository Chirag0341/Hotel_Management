const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['owner', 'customer'], default: 'customer' }
});

module.exports = mongoose.model('User', userSchema);
