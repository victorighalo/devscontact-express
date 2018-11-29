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
    return res.status(400).send({data:e, status: 'fail'});
}
})

router.post('/', async function (req, res) {
    await db.DevCat.findById(req.body.category, function(err, devcat){
        if(err) { return res.status(400).send({data: err, status: 'fail'});}
    //    return res.status(400).send({data: devcat, status: 'fail'});
   
    //Check if Dev already exists in Database
   db.Devs.findOne({email: req.body.email}, (err, dev) => {
        if(err){//If error in query return error
            return res.status(400).send({data: err, status: 'fail'});
        }
        if(dev){//Dev already exists, the email is already taken
            return res.status(400).send({data: `Developer with email(${req.body.email}) already exists`, status: 'fail'});
        }
    });

    try{
    db.Devs({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        category: req.body.category,
    }).save((err, data) => {
        return res.status(200).send({message: 'Developer registered',data: data, status: 'done'});
    })
    }catch(e){
        return res.status(400).send({data:e, status: 'fail'});
    }
    
});
})

router.put('/', async function (req, res) {
    try{
            await db.Devs.findOneAndUpdate({
                email: req.body.email
            }, req.body, {new: true}, function (err, data) {
                if (err) return res.status(400).send({data:err, status: 'fail'});
                return res.status(200).send({message: 'Developer contact updated',data: data, status: 'done'});
            });
        }catch(e){
            return res.status(400).send({data:e, status: 'fail'});
        }
})

router.delete('/', async function (req, res) {
    try{
    await db.Devs.findOneAndRemove({
        email: req.body.email
    }, function (err, data) {
        if (err) return res.status(400).send({data:err, status: 'fail'});
        return res.status(200).send({data:data, status: 'done'});
    });
}catch(e){
    return res.status(400).send({data:e, status: 'fail'});
}
})

module.exports = router;