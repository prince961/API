const express = require("express");

const router = express.Router();

const pincodeController = require("../controllers/pincode.controller");

router.get("/:pid", pincodeController.getPincode);

router.post("/", pincodeController.postPincode);

module.exports = router;
