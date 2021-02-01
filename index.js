const express = require('express');
const bodyParser = require("body-parser");
const routes =require("./Routes/api");
const mongoose = require('mongoose');

const app = express();

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


  
app.use(bodyParser.json()); 
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