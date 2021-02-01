const express = require('express');
const { Logger } = require('mongodb');
const Ninja = require('../Models/order');
const router = express.Router();

var auth = function(req, res, next){
    var authorization = req.headers.auth;
    console.log(authorization);
  
    var userPass = authorization.split(' ')[1];
    var plainText = Buffer.from(userPass, "base64").toString("ascii");
  
    var userName = plainText.split(":")[0];
    var password = plainText.split(":")[1];
  
    if(password == "E01e123"){
      next()
    }else{
      res.send("authentication failed");
      res.status(401);
    }
  
  }  


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