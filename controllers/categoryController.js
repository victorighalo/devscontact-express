const db = require('../models/index')
const validator = require('../app/validators/')

exports.category_get_all = function (req, res) {
    db.DevCat.find({})
    .then( data => {
        res.status(200).send(data);
    })
    .catch(e =>{
    return next(new Error(e))
    })
    }

exports.category_get = function(req, res, next){ 
    try{
    db.DevCat.findById(req.params.categoryId, function (err, data) {
        if(err){
            next(err);
        }
        res.status(200).send(data)
    });
    }catch(e){
        next(new Error(e))
    }
}

exports.category_create = function (req, res, next) {
    const {error} = validator.validate_category_create(req.body); //validate request
    if(error){ return next(error)}  
    db.DevCat.init().then(function() {
    db.DevCat.create(req.body)
    .then( (data) => {
            res.status(201).send({message: 'Category craeted',data: data});
    } )
    .catch( (error) => {
        return next(error);
    })
    })
    .catch( (error) => {
        return next(error);
    })
}

exports.category_update = function (req, res) {
    const {error} = validator.validate_category_update(req.body); //validate request
    if(error){ return next(error)}  
    db.DevCat.findByIdAndUpdate(req.body.id, {
        name: req.body.name
    })
    .then( (data)=> {
        res.status(200).send({message:'Category updated'});
    })
    .catch( e => {
        next(new Error(e));
    })
}

exports.category_delete = function (req, res, next) {
    const {error} = validator.validate_category_delete(req.body); //validate request
    if(error){ return next(error)}  
    db.DevCat.findByIdAndDelete(
     req.body.id
    )
    .then( data => {
        res.status(200).send({message:'Category deleted'})
    })
    .catch( e => {
         next(new Error(e));
    })
    }