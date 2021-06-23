const passportService = require("../services/user.passport");
const passport = require("passport");

exports.userRequireAuth = passport.authenticate("jwt", { session: false });
exports.userRequireSignin = passport.authenticate("local", { session: false });