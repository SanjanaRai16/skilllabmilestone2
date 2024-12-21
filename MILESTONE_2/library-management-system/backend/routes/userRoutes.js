// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware'); // Ensure this path is correct

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Protected route to get user profile
router.get('/profile', authMiddleware(), getUserProfile); // Correctly use authMiddleware

module.exports = router;
