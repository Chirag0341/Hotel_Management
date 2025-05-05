// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const app = require('./app');
const Database = require('./config/db'); // Singleton DB connection
Database._connect();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
app.use(cors());

// Start the server after ensuring DB is connected
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
