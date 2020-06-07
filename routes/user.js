const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');


router.post("/addfav", function (req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user._id);
    console.log(req.body.id);
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
    res.send("unauhtorized");
  }
});


router.post("/remfav", function (req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user._id);
    console.log(req.body.id);
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
    res.send("unauhtorized");
  }
})









module.exports = router;