const mongoose = require('mongoose');
const url = "mongodb://victorighalo:smart%401@ds119304.mlab.com:19304/devsconnect"
mongoose.set('debug', true);
mongoose.connect(url);
mongoose.PromiseProvider = Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
});

