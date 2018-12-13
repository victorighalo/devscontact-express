var passport = require('passport');
var LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
},
   async function(email, password, done) {
     await User.findOne({ email: email }, async function (err, user) {
         if (err || !user) { return done(null, false, { errors: { 'email or password': 'is invalid' } }); }
        await bcrypt.compare(password, user.password, function(err, res) {
          if (res === false) { return done(null, false, { errors: { 'password': 'is invalid' } }); }
          return done(null, user, { errors: { } });
      });
        
      })
    }
  ));

exports.passport = passport;