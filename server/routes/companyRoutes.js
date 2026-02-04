const express = require('express');
const router = express.Router();
const { getAllCompanies, getCompany } = require('../controllers/companyController');

router.get('/', getAllCompanies);
router.get('/:name', getCompany);

module.exports = router;