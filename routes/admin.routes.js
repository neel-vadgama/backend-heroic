const controller = require("../controllers/admin.controllers");
const express = require("express");
const router = express.Router();

  // admin routes
  router.post("/api/topic", controller.postTopic);
  router.post("/api/theme", controller.postTheme);
  router.post("/api/episode", controller.postEpisode);

  router.get("/api/topic-title", controller.getTopicTitle);
  router.get("/api/topic", controller.getTopic);
  router.get("/api/theme", controller.getTheme);
  router.get("/api/episode", controller.getEpisode);

  router.get("/api/organization", controller.getOrganization);
  router.get("/api/organization/:id", controller.getOrgById);
  

module.exports = router;
