const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();


const Product = require('../model/product');
const User = require('../model/user');

router.get("/", function (req, res) {
  Product.find({}, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})


router.post("/main", function (req, res) {
  Product.findRandom({ category: req.body.category }, {}, { limit: 6 }, function (err, result) {
    if (err) { console.log(err); return }
    res.send(result);
  });
})


router.post("/full", function (req, res) {
  Product.find({ category: req.body.category }, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})



router.post("/filter1", function (req, res) {
  var query = Product.find({ category: req.body.category }).sort({ 'actPrice': req.body.order });
  query.exec(function (err, result) {
    if (err) { console.log(err); return }
    res.send(result);
  });
});

router.post("/filter2", function (req, res) {
  var query = Product.find({ $and: [{ category: req.body.category }, { 'actPrice': { $gte: req.body.start, $lte: req.body.end } }] }).sort({ 'price': 'asc' });
  query.exec(function (err, result) {
    if (err) { console.log(err); return }
    res.send(result);
  });
});


router.post("/findone", function (req, res) {
  Product.findById(req.body.id, (err, result) => {
    if (err) {
      if (err instanceof mongoose.CastError) {
        res.send([]);
      }
      console.log(err); return;
    }
    else {
      res.send(result);
    }
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


router.post("/search", function (req, res) {
  Product.find({ name: { '$regex': req.body.search, $options: 'i' } }, (err, result) => {
    if (err) { console.log(err); return; }
    res.send(result);
  })
})





module.exports = router;