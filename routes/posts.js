const express = require('express');
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');

router.get("/", function (req, res) {
  Product.find({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})


router.post("/findone", function (req, res) {
  Product.findById(req.body.id, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})

router.get("/fav", function (req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user._id, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        let fav = result._doc.favItem;
        Product.find({
          '_id': {
            $in: fav
          }
        }, function (err, docs) {
          res.send(docs);
        });
      }
    }
    );
  }
  else {
    res.send("unauthorized");
  }
})


router.get("/cart", function (req, res) {
  if (req.isAuthenticated()) {
    User.findById(req.user._id, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        let cart = result._doc.card;
        var ids = cart.map(function (x) { return x._id });
        Product.find({
          '_id': {
            $in: ids
          }
        }, function (err, docs) {
          res.send(docs);
        });
      }
    }
    );
  }
  else {
    res.send("unauthorized");
  }
})







module.exports = router;