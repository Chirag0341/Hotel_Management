// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

let instance = null;
console.log('MONGO_URI:', process.env.MONGO_URI);
class Database {
  constructor() {
    if (!instance) {
      instance = this;
      this._connect();
    }
    return instance;
  }

  _connect() {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
  }
}

module.exports = new Database();
