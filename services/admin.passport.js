const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const Admin = require("../models/admin.models");
const keys = require("../config/key");

const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(
  localOptions,
  function (email, password, done) {
    Admin.findOne({ email: email.toLowerCase() }, function (err, admin) {
      if (err) {
        return done(err);
      }
      if (!admin) {
        return done(null, false);
      }

      admin.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, admin);
      });
    });
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: keys.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  Admin.findById(payload.sub, function (err, admin) {
    if (err) {
      return done(err, false);
    }
    if (admin) {
      done(null, admin);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);