const express = require('express');
const {addGift, 
       getAllgifts, 
       getgift,
       updategift,
       deletegift
      } = require('../controllers/giftController');

const router = express.Router();

router.post('/gift', addGift);
router.get('/gifts', getAllgifts);
router.get('/gift/:id', getgift);
router.put('/gift/:id', updategift);
router.delete('/gift/:id', deletegift);


module.exports = {
    routes: router
}