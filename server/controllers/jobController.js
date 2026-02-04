const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const { search, type, location, field, experienceLevel, sortBy } = req.query;
    
    let query = { status: 'active' };
    
    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Type filter
    if (type && type !== 'all' && type !== 'All') {
      query.type = type;
    }
    
    // Location filter
    if (location && location !== 'all' && location !== 'All') {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Field filter
    if (field && field !== 'all' && field !== 'All') {
      query.field = field;
    }
    
    let jobs = await Job.find(query);
    
    // Sorting
    if (sortBy) {
      if (sortBy === 'latest' || sortBy === 'Latest') {
        jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      } else if (sortBy === 'stipend' || sortBy === 'Highest Stipend') {
        jobs.sort((a, b) => {
          const aStipend = parseInt(a.stipend.replace(/[^0-9]/g, '')) || 0;
          const bStipend = parseInt(b.stipend.replace(/[^0-9]/g, '')) || 0;
          return bStipend - aStipend;
        });
      } else if (sortBy === 'applicants' || sortBy === 'Least Applicants') {
        jobs.sort((a, b) => a.applicants - b.applicants);
      }
    } else {
      jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }
    
    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }
    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};