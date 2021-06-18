const passportService = require("../services/admin.passport");
const passport = require("passport");

exports.adminRequireAuth = passport.authenticate("jwt", { session: false });
exports.adminRequireSignin = passport.authenticate("local", { session: false });