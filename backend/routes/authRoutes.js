const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Route: POST /api/auth/register
router.post('/register', register);

// Route: POST /api/auth/login
router.post('/login', login);

// Route: GET /api/auth/me (Protected - requires a valid token)
router.get('/me', protect, getMe);

module.exports = router;
