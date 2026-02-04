const express = require('express');
const router = express.Router();
const { uploadResume, getUserResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/upload', protect, uploadResume);
router.get('/', protect, getUserResume);

module.exports = router;