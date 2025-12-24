const express = require('express');
const { getActivities } = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.get('/', protect, getActivities);

module.exports = router;
