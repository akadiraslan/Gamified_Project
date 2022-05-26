const express = require('express');
const {addQuestion, 
       getAllQuestions, 
       getQuestion,
       updateQuestion,
       deleteQuestion
      } = require('../controllers/questionController');

const router = express.Router();

router.post('/question', addQuestion);
router.get('/questions', getAllQuestions);
router.get('/question/:id', getQuestion);
router.put('/question/:id', updateQuestion);
router.delete('/question/:id', deleteQuestion);


module.exports = {
    routes: router
}