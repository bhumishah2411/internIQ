const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ceo: String,
  founded: String,
  employees: String,
  mission: String,
  about: String,
  ppoRate: String,
  avgStipend: String,
  faqs: [{
    question: String,
    answer: String
  }],
  interviewRounds: [{
    round: String,
    duration: String,
    tips: String
  }],
  requiredSkills: [{
    skill: String,
    level: String
  }],
  preparation: [{
    resource: String,
    type: String,
    priority: String
  }]
});

module.exports = mongoose.model('Company', companySchema);