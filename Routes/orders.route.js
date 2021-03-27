const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orders.controller");

router.get("/orders", orderController.getOrders);

router.post("/orders", orderController.postOrders);

//PUT = Update
router.put("/orders:id", orderController.putOrders);

router.delete("/orders:id", orderController.deleteOrders);

module.exports = router;
