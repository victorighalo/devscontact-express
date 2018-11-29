const mongoose = require('mongoose');

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
        type: Number,
        required: true
    }
    },{
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

const DevCatSchema = new mongoose.Schema({
        categoryid: {
            type: Number,
            required:true,
            maxlength: 55
        },
        categoryname: {
            type: String,
            required: true,
            maxlength: 55
        }
    },{
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

const DevCat = mongoose.model('Category', DevCatSchema);
const Devs = mongoose.model('Developer', DevSchema);

module.exports = {Devs, DevCat};