const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



//Register 
router.post('/register', authController.user_create);

//Login
router.post('/login', authController.user_login);

router.get('/users', function(){

})

router.get('/users/:userId', function(){
    
})



module.exports = router;