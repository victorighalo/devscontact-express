const express = require('express');
const router = express.Router()
const db = require('../models/index')

router.get('/', function (req, res) {
    try{
    db.DevCat.find({}, function (err, devs) {
        res.status(200).send(devs);
    })
}catch(e){
    return res.status(400).send({data:e, status: 'fail'});
}
})

router.post('/', async function (req, res) {

    await db.DevCat.findOne({categoryid: req.body.categoryid}, (err, dev) => {
        if(err){//If error in query return error
            return res.status(400).send({data: err, status: 'fail'});
        }
        if(dev){
            return res.status(400).send({data: `${req.body.categoryname}) already exists`, status: 'fail'});
        }
    });

    try{
    await db.DevCat({
        name: req.body.name
    }).save((err, data) => {
        res.status(200).send({message: 'Category added', data: {err,data}, status: 'done'});
    })
}catch(e){
    return res.status(400).send({data:e, status: 'fail'});
}
   
})

router.put('/', async function (req, res) {
    try{
    await db.DevCat.findOneAndUpdate({
        categoryid: req.body.categoryid
    }, req.body, {new: true}, function (err, update) {
        if (err) return res.status(400).send({data:err, status: 'fail'});
        return res.status(200).send({data:update, status: 'pass'});
    });
}catch(e){
    return res.status(400).send({data:e, status: 'fail'});
}
})

router.delete('/', async function (req, res) {
    try{
    await db.DevCat.findOneAndRemove({
        categoryid: req.body.categoryid
    }, function (err, update) {
        if (err) return res.status(400).send({data:err, status: 'fail'});
        return res.status(200).send({data:update, status: 'pass'});
    });
    }catch(e){
        return res.status(400).send({data:e, status: 'fail'});
    }
})

module.exports = router;