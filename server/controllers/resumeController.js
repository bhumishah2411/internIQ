const Resume = require('../models/Resume');

exports.uploadResume = async (req, res) => {
  try {
    const { fileName } = req.body;

    const atsScore = Math.floor(Math.random() * 30) + 70;

    const resume = await Resume.create({
      userId: req.user.id,
      fileName,
      atsScore,
      skills: ['React', 'Node.js', 'MongoDB', 'Python'],
      keywords: ['Leadership', 'Team Player', 'Problem Solving'],
      suggestions: ['Add more technical skills', 'Include quantifiable achievements']
    });

    res.status(201).json({
      success: true,
      resume
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getUserResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id }).sort({ uploadedAt: -1 });
    res.status(200).json({
      success: true,
      resume
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};