const express = require("express");

const router = express.Router();

const rateController = require("../controllers/rate.controller");

router.get("/", rateController.getRate);

module.exports = router;
