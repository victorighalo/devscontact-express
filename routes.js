const express = require('express');
const router = express.Router()
const Devs = require('./models/devscontact')

router.get('/', function (req, res) {
   Devs.find({}, function (err, devs) {
       res.status(200).send(devs);
   })
})

router.post('/', async function (req, res) {
    //Check if Dev already exists in Database
    await Devs.findOne({email: req.body.email}, (err, dev) => {
        if(err){//If error in query return error
            return res.status(400).send({data: err, status: 'fail'});
        }
        if(dev){//Dev already exists, the email is already taken
            return res.status(400).send({data: `Developer with email(${req.body.email}) already exists`, status: 'fail'});
        }
    });
    await Devs({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        category: req.body.category,
    }).save()
    res.status(200).send({data: 'Developer registered', status: 'done'});
})

router.put('/', async function (req, res) {
            await Devs.findOneAndUpdate({
                email: req.body.email
            }, req.body, {new: true}, function (err, update) {
                if (err) return res.status(400).send({data:err, status: 'fail'});
                return res.status(200).send({data:update, status: 'pass'});
            });
})

router.delete('/', async function (req, res) {
    await Devs.findOneAndRemove({
        email: req.body.email
    }, function (err, update) {
        if (err) return res.status(400).send({data:err, status: 'fail'});
        return res.status(200).send({data:update, status: 'pass'});
    });
})

module.exports = router;