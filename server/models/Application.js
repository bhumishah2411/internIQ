const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
    type: String,
    enum: [
      'Applied',
      'Resume Shortlisted',
      'OA Cleared',
      'Technical',
      'HR',
      'Selected',
      'Rejected'
    ],
    default: 'Applied'
  },
  isGoalCompany: {
    type: Boolean,
    default: false
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  rejectionReason: String,
  notes: String
});

module.exports = mongoose.model('Application', applicationSchema);