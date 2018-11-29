const mongoose = require('mongoose');

const DevCatSchema = new mongoose.Schema({
    name: {
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

module.exports = DevCat;