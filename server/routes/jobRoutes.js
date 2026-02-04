const express = require('express');
const router = express.Router();
const { getAllJobs, getJob, createJob } = require('../controllers/jobController');

router.get('/', getAllJobs);
router.get('/:id', getJob);
router.post('/', createJob);

module.exports = router;