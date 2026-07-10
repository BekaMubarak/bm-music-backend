const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// Initialize the Express framework application instance
const app = express();

// Establish connection to MongoDB Atlas database cluster
connectDB();

// Global Request Middlewares
app.use(cors()); // Allows your front-end application to safely talk to this backend
app.use(express.json()); // Allows the server to read incoming JSON request bodies

// Mount API Route Endpoints to separate traffic channels
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/songs', require('./routes/songRoutes'));
app.use('/api/albums', require('./routes/albumRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Fallback Route for non-existent server addresses
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API core endpoint address not found' });
});

// Start listening for network requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Server Run] Hub application online and streaming live on port ${PORT}`);
});
