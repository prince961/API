const express = require('express');
const { Logger } = require('mongodb');
const Ninja = require('../Models/order');
const router = express.Router();



router.get("/orders",function(req, res,next){
    res.send({type:"GET"});
})

router.post("/orders",function(req, res, next){
    let userName = localStorage.getItem("userName");
    console.log(userName);
    var order = req.body;
    order.pickup_location["CustomerCode"]=userName;
    console.log(order);
    Ninja.create(order).then(function(ninja){
        res.send(ninja);
        console.log("Ninja created with id: "+ninja.id);
    }).catch(next); 
});

//PUT = Update
router.put("/orders:id",function(req, res , next){
    res.send({type:"PUT"});
})

router.delete("/orders:id",function(req, res, next){
    res.send({type:"DELETE"});
})

module.exports = router;