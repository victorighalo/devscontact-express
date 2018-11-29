const express = require('express');
const router = express.Router()
const db = require('../models/devscontact')

router.get('/', function (req, res) {
    dbDevCat.find({}, function (err, devs) {
        res.status(200).send(devs);
    })
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
    await db.DevCat({
        categoryid: req.body.categoryid,
        categoryname: req.body.categoryname
    }).save()
    res.status(200).send({data: 'Category added registered', status: 'done'});
})

router.put('/', async function (req, res) {
    await db.DevCat.findOneAndUpdate({
        categoryid: req.body.categoryid
    }, req.body, {new: true}, function (err, update) {
        if (err) return res.status(400).send({data:err, status: 'fail'});
        return res.status(200).send({data:update, status: 'pass'});
    });
})

router.delete('/', async function (req, res) {
    await db.DevCat.findOneAndRemove({
        categoryid: req.body.categoryid
    }, function (err, update) {
        if (err) return res.status(400).send({data:err, status: 'fail'});
        return res.status(200).send({data:update, status: 'pass'});
    });
})

module.exports = router;