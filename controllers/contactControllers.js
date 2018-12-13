const db = require('../models/index')
const validator = require('../app/validators/')


exports.contact_get_all = function (req, res, next) {
    try{
   db.Devs.find({}).
  populate('category', 'name').
  exec(function (err, devs) {
    if (err) next(new Error(err));
    return res.status(200).send(devs);
  });
}
catch(e){
    next(new Error(e));
}
}

exports.contact_get = function(req, res, next){ 
    try{
    db.Devs.findById(req.params.contactId, function (err, data) {
        if(err){
            res.status(400).next(err);
        }
        res.status(200).send(data)
    });
    }catch(e){
        next(new Error(e))
    }
}

exports.contact_create = function (req, res, next) {  
    const {error} = validator.validate_contact_create(req.body); //validate request
    if(error){ next(error)}     
    db.Devs.init().then(function() {
    try{
    db.Devs({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        category: req.body.category,
    }).save((err, data) => {
        if(!err){
            res.status(201).send({message: 'Developer registered',data: data});
              }
              res.status(400).send({message: `Developer with email(${req.body.email}) already exists`});
    })
    }catch(e){
        next(new Error(e));
    }
}).catch( (e)=>{
    next(new Error(e));
});
}

exports.contact_update = function (req, res, next) {
    const {error} = validator.validate_contact_update(req.body); //validate request
    if(error){ next(error)}    
    db.Devs.findByIdAndUpdate(req.body.id, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        category: req.body.category
    })
    .then( ()=> {
        res.status(200).send({message:'Contact updated'});
    })
    .catch( e => {
        next(new Error(e));
    })
}

exports.contact_delete = function (req, res, next) {
    const {error} = validator.validate_contact_delete(req.body); //validate request
    if(error){ next(error)}    
    db.Devs.findByIdAndDelete(
        req.body.id
       )
       .then( data => {
           res.status(204).send({message:'Developer deleted'})
       })
       .catch( e =>{
            next(new Error(e));
       })
    }