const express = require('express');
const router = express.Router()
const db = require('../models/index')

router.get('/', function (req, res) {
    try{
   db.Devs.find({}).
  populate('category').
  exec(function (err, devs) {
    if (err) return handleError(err);
    return res.status(200).send(devs);
  });
}
catch(e){
    next(new Error(e));
}
})

router.post('/', async function (req, res) {   
    //Check if Dev already exists in Database
   db.Devs.findOne({email: req.body.email})
   .then( data => {
    res.status(400);
    next(new Error(`Developer with email(${req.body.email}) already exists`))
   })
   .catch( e => {
       next(new Error(e));
   });

    try{
    db.Devs({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        category: req.body.category,
    }).save((err, data) => {
        return res.status(200).send({message: 'Developer registered',data: data});
    })
    }catch(e){
        next(new Error(e));
    }
})

router.put('/', async function (req, res) {
        await db.Devs.findByIdAndUpdate(req.body.id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            category: req.body.category
        })
        .then( (data)=> {
            res.status(200).send({message:'Contact updated'});
        })
        .catch( e => {
            next(new Error(e));
        })
})

router.delete('/', async function (req, res) {
db.Devs.findByIdAndDelete(
    req.body.id
   )
   .then( data => {
       res.status(200).send({message:'Developer deleted'})
   })
   .catch( e =>{
        netx(new Error(e));
   })
})

module.exports = router;