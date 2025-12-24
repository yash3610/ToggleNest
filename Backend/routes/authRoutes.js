const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/me', protect, getMe);
router.get('/users', protect, getAllUsers);

module.exports = router;
