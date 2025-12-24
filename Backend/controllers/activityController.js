const ActivityLog = require('../models/ActivityLog');

// @desc    Get all activity logs (optionally filter by project)
// @route   GET /api/activities?project=projectId
// @access  Private
const getActivities = async (req, res) => {
  try {
    const filter = req.query.project ? { project: req.query.project } : {};
    
    const activities = await ActivityLog.find(filter)
      .populate('user', 'name email')
      .populate('project', 'title')
      .populate('task', 'title')
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 activities

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActivities,
};
