const Authentication = require("../controllers/admin.controllers");
const middleware = require("../middleware/admin.middle")


module.exports = function (app) {
  // auth routes
  app.get("/api/v1/admin",middleware.adminRequireAuth , function (req, res) {
    res.send({ hi: "there" });
  });
  app.post("/api/v1/admin/login", middleware.adminRequireSignin, Authentication.signin);
  app.post("/api/v1/admin/register", Authentication.signup);
  app.get("/api/v1/admin/logout", function (req, res) {
    req.logout();
  });
};