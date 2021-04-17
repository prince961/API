const express = require("express");

const router = express.Router();

const trackController = require("../controllers/track.controller");

router.get("/", trackController.getTrack);

module.exports = router;
