const express = require('express');
const {addReport, 
       getAllReports, 
       getReport,
       getReportByUserID,
       getReportsByTestID,
       setUserScore,
       updateReport,
       deleteReport
      } = require('../controllers/reportController');

const router = express.Router();

router.post('/report', addReport);
router.get('/reports', getAllReports);
router.get('/report/:id', getReport);
router.get('/report/test/:id', getReportsByTestID);
router.get('/report/user/:id', getReportByUserID);
router.put('/report/user/:id', setUserScore);
router.put('/report/:id', updateReport);
router.delete('/report/:id', deleteReport);


module.exports = {
    routes: router
}