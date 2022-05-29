const express = require('express');
const {addUser, 
       getAllUsers, 
       getUser,
       userLogin,
       updateUser,
       deleteUser
      } = require('../controllers/userController');

const router = express.Router();

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.get('/user/:id/:password',userLogin);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


module.exports = {
    routes: router
}