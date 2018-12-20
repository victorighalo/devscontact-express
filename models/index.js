require('dotenv').config()
const mongoose = require('mongoose');
mongoose.set('debug', true);
if(process.env.NODE_ENV == 'DEVELOPMENT'){
    mongoose.connect(process.env.DB_HOST, { useCreateIndex: true, useNewUrlParser: true  });
}else{
   mongoose.connect(process.env.DB_HOST_TEST, { useCreateIndex: true, useNewUrlParser: true  });
}

mongoose.PromiseProvider = Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});

const DevCat = require('./devscategory');
const Devs = require('./devscontact');
const User = require('./user');

module.exports = {Devs, DevCat, User};