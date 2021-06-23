const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const User = require("../models/user.model");
const keys = require("../config/key");

const localOptions = { usernameField: 'Email' , passwordField: 'Password' };
const localLogin = new LocalStrategy(
  localOptions,
  function (Email, Password, done) {
    User.findOne({ Email: Email.toLowerCase() }, function (err, user) {
      
      if (err) { return done(err); }
      
      if (!user) {
        return done(null, false, { message: 'Incorrect Email.' });
      }

      if (!user.validPassword(Password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
      });
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);