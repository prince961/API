const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const orderRoutes = require("./Routes/orders.route");
const pincodeRoute = require("./Routes/pincode.route");
const authRoute = require("./Routes/auth.route");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
// var LocalStorage = require("node-localstorage").LocalStorage;
// localStorage = new LocalStorage("./scratch");
// const User = require("./Models/user");

const app = express();
app.use(cors());

// var auth = function (req, res, next) {
//   var authorization = req.headers.authorization;
//   console.log(authorization);
//   if (authorization == undefined) {
//     console.log("please use basic Authorization");
//     res.send("please use basic Authorization");
//   } else {
//     var userPass = authorization.split(" ")[1];
//     var plainText = Buffer.from(userPass, "base64").toString("ascii");
//     var userName = plainText.split(":")[0];
//     var password = plainText.split(":")[1];
//     localStorage.setItem("userName", userName);
//     console.log(
//       "userName from local storage" + localStorage.getItem("userName")
//     );
//     var dbUserPassword;

//     //Query DB for credentials
//     User.findOne({ userName: userName }).then(function (dbUser) {
//       localStorage.setItem("userPassword", dbUser.password);
//       dbUserPassword = dbUser.password;
//     });

//     console.log("Authentication password is: " + password);
//     console.log("dbUser: " + dbUserPassword);
//     if (password === localStorage.getItem("userPassword")) {
//       localStorage.setItem("userPassword", "NA");
//       next();
//     } else {
//       res.send("authentication failed");
//       res.status(401);
//     }
//   }
// };

// using routes

app.use(bodyParser.json());
// app.use(auth);
app.use("/api", orderRoutes);
app.use("/api/pincode", pincodeRoute);
app.use("/api/auth", authRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  return next(error);
});
//error handling middleware
app.use(function (error, req, res, next) {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//port setting
const PORT = process.env.POST || 4000;

//Connect to Mongo DB
mongoose.Promise = global.Promise;
const uri =
  "mongodb+srv://admin:admin@cluster0.h7wqs.mongodb.net/apiLogistics?retryWrites=true&w=majority";
const options = {
  poolSize: 10,
  dbName: "Users",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(uri, options).then(
  () => {
    //listen for requests
    app.listen(PORT, function () {
      console.log("Connected to db and listening for requests at port " + PORT);
    });
  },
  (err) => {
    console.log("Error connecting Database instance due to: ", err);
  }
);
