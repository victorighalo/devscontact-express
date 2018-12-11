const express = require('express');
const router = express.Router()
const db = require('../models/index')

router.get('/', function (req, res) {
    db.DevCat.find({})
    .then( data => {
        res.status(200).send(data);
    })
    .catch(e =>{
    return next(new Error(e))
    })
    })

router.post('/', function (req, res, next) {
    if(!req.body.name){
        res.status(400);
         return next('Name property required')
    }
     db.DevCat.findOne({name: req.body.name})
     .then( res => { 
          res.status(400).send({data: `${req.body.name} category already exists`})
        })
        .catch( err => {
            next(new Error(e)) 
        })

    db.DevCat.create(req.body)
    .then( (data) => {
        res.status(200).send({message: 'Category added', data: data});
    } )
    .catch( (error) => {
        return next(error);
    })
   
})

router.put('/', async function (req, res) {
    await db.DevCat.findByIdAndUpdate(req.body.id, {
        name: req.body.name
    })
    .then( (data)=> {
        res.status(200).send({message:'Category updated'});
    })
    .catch( e => {
        next(new Error(e));
    })
})

router.delete('/', async function (req, res, next) {
    db.DevCat.findByIdAndDelete(
     req.body.id
    )
    .then( data => {
        res.status(200).send({message:'Category deleted'})
    })
    .catch( e => {
         next(new Error(e));
    })
    });

module.exports = router;