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

const DevSchema = new mongoose.Schema({
        firstname: {
            type: String,
            required: 'First name cannot be left blank.',
            maxlength: 55
        },
        lastname: {
            type: String,
            required: true,
            maxlength: 55
        },
        email: { type: String, required: 'Last name cannot be left blank.',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            index: true,
            unique: true,
            minlength: 6,
            maxlength: 255
        },
        phone: {
            type: Number,
            required: false,
            minlength: 10,
            maxlength: 1024
        },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    },{
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

var Devs = mongoose.model('Developer', DevSchema);

module.exports = Devs;