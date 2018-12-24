const db = require('../models/index')
const passport = require('passport');
require('../app/config/passportSetup');
const validator = require('../app/validators/')
const bcrypt = require('bcryptjs');

exports.user_create =  function(req, res, next){
    const {error} = validator.validate_user_create(req.body); //validate request
    if(error){ next(error)}     
   
   //Salt and register New User
    bcrypt.genSalt(10, function(err, salt) {
        if(err){
            next(new Error('An Error Occurred. Try again.'))
        }
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err){
                next(new Error('An Error Occurred. Try again.'))
            }

    db.User.init().then(function() {
        db.User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
        }).save((err, data) => {
    
            if(!err){
                let {email, firstname, lastname, _id, createdAt} = data;
                return res.status(201).send({message: 'User registered',data: {email, firstname, lastname, _id, createdAt}});
                  }else{
                    return res.status(400).send({message:`User with email (${req.body.email}) already exists`});
                  }
        })

    }).catch( (e)=>{
        next(new Error(e));
    });
});
});
 
}

exports.user_login = function(req, res, next){
    const {error} = validator.validate_user_login(req.body ); //validate request
    if(error){ next(error)} 
        passport.authenticate('local',{ session: false },
        function(err, user, info) {
            if(err){
                res.status(400).send(
                    {message: info}
                )
            }
            if (!user) { 
                res.status(400).send(
                    {message: info}
                )
             }else{
                const token = user.generateToken();
                res.status(200).send(
                    {token}
                )   
             }
    
        }
        )(req,res);

exports.get_users_all = function(req, res, next){
    db.User.find({})
    .then( data => {
        res.status(200).send(data);
    })
    .catch(e =>{
    return next(new Error(e))
    })
}

exports.get_user = function(){
    try{
        db.User.findById(req.params.userId, function (err, data) {
            if(err){
                next(err);
            }
            res.status(200).send(data)
        });
        }catch(e){
            next(new Error(e))
        }
}

}