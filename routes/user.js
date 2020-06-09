const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');


router.post("/addfav", function (req, res) {
  if (req.isAuthenticated()) {
    User.findByIdAndUpdate(req.user._id, { $push: { favItem: req.body.id } }, { new: true },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  }
  else {
    res.send("unauthorized");
  }
});


router.post("/remfav", function (req, res) {
  if (req.isAuthenticated()) {
    User.findByIdAndUpdate(req.user._id, { $pull: { favItem: req.body.id } }, { new: true },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  }
  else {
    res.send("unauthorized");
  }
})



router.post("/addCart", function (req, res) {
  if (req.isAuthenticated()) {
    User.findByIdAndUpdate(req.user._id, { $push: { card: req.body } }, { new: true },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  }
  else {
    res.send("unauthorized");
  }
});

router.post("/remCart", function (req, res) {
  console.log(req.body.id);
  if (req.isAuthenticated()) {
    User.findByIdAndUpdate(req.user._id, { $pull: { card: { _id: req.body.id } } }, { new: true },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  }
  else {
    res.send("unauthorized");
  }
})








module.exports = router;