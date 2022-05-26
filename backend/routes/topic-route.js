const express = require('express');
const {addTopic, 
       getAllTopics, 
       getTopic,
       updateTopic,
       deleteTopic
      } = require('../controllers/topicController');

const router = express.Router();

router.post('/topic', addTopic);
router.get('/topics', getAllTopics);
router.get('/topic/:id', getTopic);
router.put('/topic/:id', updateTopic);
router.delete('/topic/:id', deleteTopic);


module.exports = {
    routes: router
}