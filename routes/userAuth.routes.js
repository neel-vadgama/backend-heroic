const Authentication = require("../controllers/user.controllers");
const middleware = require("../middleware/user.middle")

module.exports = function (app) {
  // user auth routes
  app.get("/api/v1/user",middleware.userRequireAuth , function (req, res) {
    res.send({ hi: "there" });
  });
  app.get("/api/v1/user/:id", Authentication.getUserById);
 
  app.post("/api/v1/user/login", middleware.userRequireSignin, Authentication.signin);
  app.post("/api/v1/user/register", Authentication.signup);
  app.get("/api/v1/user/logout", function (req, res) {
    req.logout();
  });
  
};