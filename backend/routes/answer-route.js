const express = require('express');
const {addAnswer, 
       getAllAnswers, 
       getAnswer,
       updateAnswer,
       deleteAnswer
      } = require('../controllers/answerController');

const router = express.Router();

router.post('/answer', addAnswer);
router.get('/answers', getAllAnswers);
router.get('/answer/:id', getAnswer);
router.put('/answer/:id', updateAnswer);
router.delete('/answer/:id', deleteAnswer);


module.exports = {
    routes: router
}