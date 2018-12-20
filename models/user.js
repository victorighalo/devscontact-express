var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
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
    password: { 
      type: String, 
      required: true,
      minlength: 6,
      maxlength: 1024
    }
},{
timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}
);

UserSchema.methods.generateToken = function(){
  return jwt.sign({_id: this._id}, process.env.JWT_TOKEN)
}
var User = mongoose.model('User', UserSchema);

module.exports = User;