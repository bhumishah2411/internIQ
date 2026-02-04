const express = require('express');
const router = express.Router();
const { applyToJob, getUserApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, applyToJob);
router.get('/', protect, getUserApplications);
router.patch('/:id', protect, updateApplicationStatus);

module.exports = router;