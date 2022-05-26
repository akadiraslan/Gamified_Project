const express = require('express');
const {addWildcard, 
       getAllWildcards, 
       getWildcard,
       updateWildcard,
       deleteWildcard
      } = require('../controllers/WildcardController');

const router = express.Router();

router.post('/wildcard', addWildcard);
router.get('/wildcards', getAllWildcards);
router.get('/wildcard/:id', getWildcard);
router.put('/wildcard/:id', updateWildcard);
router.delete('/wildcard/:id', deleteWildcard);


module.exports = {
    routes: router
}