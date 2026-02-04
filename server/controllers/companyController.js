const Company = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({
      success: true,
      count: companies.length,
      companies
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ name: req.params.name });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }
    res.status(200).json({
      success: true,
      company
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};