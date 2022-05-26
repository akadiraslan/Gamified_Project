const express = require('express');
const {addReport, 
       getAllReports, 
       getReport,
       updateReport,
       deleteReport
      } = require('../controllers/reportController');

const router = express.Router();

router.post('/report', addReport);
router.get('/reports', getAllReports);
router.get('/report/:id', getReport);
router.put('/report/:id', updateReport);
router.delete('/report/:id', deleteReport);


module.exports = {
    routes: router
}