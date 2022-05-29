const express = require('express');
const {addTest, 
       getAllTests, 
       getTest,
       updateTest,
       deleteTest
      } = require('../controllers/testController');

const router = express.Router();

router.post('/test', addTest);
router.get('/tests', getAllTests);
router.get('/test/:id', getTest);
router.put('/test/:id', updateTest);
router.delete('/test/:id', deleteTest);


module.exports = {
    routes: router
}