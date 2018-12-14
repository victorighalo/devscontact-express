const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



//Register 
router.post('/register', authController.user_create);

//Login
router.post('/login', authController.user_login);

router.get('/auth/users', function(){

})

router.get('/auth/users/:userId', function(){
    
})

// //Logout
// router.post('/logout', function(req, res){
// res.send(req.body)
// });

// //Reset password
// router.post('/reset', function(req, res){
// res.send(req.body)
// });



module.exports = router;