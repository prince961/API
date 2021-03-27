const { Logger } = require("mongodb");
const Ninja = require("../Models/order");

exports.getOrders = (req, res, next) => {
  res.send({ type: "GET" });
};

exports.postOrders = (req, res, next) => {
  let userName = localStorage.getItem("userName");
  console.log(userName);
  var order = req.body;
  order.pickup_location["CustomerCode"] = userName;
  console.log(order);
  Ninja.create(order)
    .then((ninja) => {
      res.send(ninja);
      console.log("Ninja created with id: " + ninja.id);
    })
    .catch(next);
};

exports.putOrders = (req, res, next) => {
  res.send({ type: "PUT" });
};

exports.deleteOrders = (req, res, next) => {
  res.send({ type: "DELETE" });
};
