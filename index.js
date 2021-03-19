const express = require('express');
var cors = require('cors')
const bodyParser = require("body-parser");
const routes =require("./Routes/api");
const mongoose = require('mongoose');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const User = require('./Models/user');
const { db } = require('./Models/user');


const app = express();
app.use(cors());
//Connect to Mongo DB
mongoose.Promise = global.Promise;
const uri = "mongodb+srv://admin:admin@cluster0.h7wqs.mongodb.net/apiLogistics?retryWrites=true&w=majority";
const options = {
    poolSize: 10,
    dbName: 'Users',
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(uri,options).then(
    () => {
      console.log("Database connection established!");
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );

  var auth = function(req, res, next){
    var authorization = req.headers.authorization;
    console.log(authorization);
    if (authorization == undefined){
      res.send("please use basic Authorization")

    }else
    {
    var userPass = authorization.split(' ')[1];
    var plainText = Buffer.from(userPass, "base64").toString("ascii");
    var userName = plainText.split(":")[0];
    var password = plainText.split(":")[1];
    localStorage.setItem("userName",userName);
    var dbUserPassword;

    //Query DB for credentials
    User.findOne({"userName": userName}).then(function(dbUser){  
    localStorage.setItem("userPassword",dbUser.password);
    dbUserPassword = dbUser.password;
  });

    console.log("Authentication password is: "+password);
    console.log("dbUser: "+dbUserPassword);
    if(password  === localStorage.getItem("userPassword") ){
      localStorage.setItem("userPassword","NA");
      next();
    }else{
      
      res.send("authentication failed");
      res.status(401);
    }
  }
  
  }  
  
app.use(bodyParser.json()); 
app.use(auth);
app.use("/api",routes);

//error handling middleware
app.use(function(err,req,res,next){
    console.log(err);
    res.status(422).send("error: "+ err);
});


//listen for requests
app.listen(4000,function(){
    console.log("Now listening for requests");
});
