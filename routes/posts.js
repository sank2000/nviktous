const express = require('express');
const router = express.Router();


const Product = require('../model/product');


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









module.exports = router;