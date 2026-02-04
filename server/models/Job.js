const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Internship', 'Full-Time', 'Part-Time', 'Contract'],
    default: 'Internship'
  },
  field: {
    type: String,
    required: true
  },
  stipend: String,
  description: String,
  requirements: [String],
  skills: [String],
  applicants: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active'
  },
  postedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema);