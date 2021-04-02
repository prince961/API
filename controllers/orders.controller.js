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
  let forwardDetails = decideCompany(order);
  order.forwardDetails = forwardDetails
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

function decideCompany(order){
  //AI to be built here
  //decide company and product
  var companyName = "Delhivery";
  
  //based on the outcome need to send the API request to the respective company

  var forwardDetails = {};
  let responseFromForwardCompany = sendAPIrequestToDecidedCompany(companyName,order);
  forwardDetails.companyName =companyName;
  
  forwardDetails.companyProduct = "premium";
  forwardDetails.expectedDeliveryDate = "01-04-2021"
  forwardDetails.packagingSlipUrl = "www.xyz.com/abc"
  forwardDetails.docketNumber = "123"

  
  return forwardDetails;
}

function sendAPIrequestToDecidedCompany(companyName,order){
  //send request to the respective company and capture 1. printSlip, DocketNumber, EDD, product
  console.log("CompanyNameReceived "+order);
  return {};
}

