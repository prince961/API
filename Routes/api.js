const express = require('express');
const { Logger } = require('mongodb');
const Ninja = require('../Models/order');
const router = express.Router();


router.get("/orders",function(req, res,next){
    res.send({type:"GET"});
})

router.post("/orders",function(req, res, next){
    Ninja.create(req.body).then(function(ninja){
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