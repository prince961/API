const express = require("express");
const router = express.Router();
const User = require("../Models/user");
// const mongoose = require("mongoose");

router.post("/sign", (req, res) => {
  const { name, email, password } = req.body;
  console.log(password);
  const newUser = new User({
    name,
    email,
    password,
  });
  newUser
    .save()
    .then((data) => {
      res.json(data);
      console.log("register");
    })
    .catch((err) => {
      res.json(err);
    });
  console.log(name, email, password);
});

router.post("/login", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, data) => {
    if (data) {
      if (data.password == req.body.password) {
        console.log("Done Login");
        res.send({ Success: "Success" });
      } else {
        res.send({ Success: "Password is wrong" });
      }
    } else {
      res.send({ Success: "This Email Is not regestered!" });
    }
  });
});

router.get("/logout", function (req, res, next) {
  console.log("logout");
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        // Go to home page
        return res.redirect("/");
      }
    });
  }
});

router.post("/forgetpass", (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    console.log(data);
    // console.log(req.body.email);
    if (!data) {
      res.send({ Success: "This Email Is not regestered!" });
    } else {
      data.password = req.body.password;
      data.save((err, Person) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Success");
          res.send({ Success: "Password cheanged!" });
        }
      });
    }
  });
});

module.exports = router;
