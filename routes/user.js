const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});


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
});





router.post("/buy", function (req, res) {
  const addDetail = JSON.parse(req.body.address);
  const product = JSON.parse(req.body.product);
  const ItemD = JSON.parse(req.body.ItemD);
  if (req.isAuthenticated()) {
    const ord = new Order(
      {
        user_id: req.user._id,
        address: addDetail.address + " - " + addDetail.pincode,
        amount: product.price,
        count: product.count,
        item: ItemD,
        status: [{ status: "ordered", date: new Date() }]
      }
    );
    ord.save(function (err, doc) {
      if (err) {
        console.log(err);
      }
      else {
        const { user_id, ...data } = doc._doc;
        User.findByIdAndUpdate(req.user._id, { card: [], address: addDetail.address, pincode: addDetail.pincode, phn: addDetail.phn, email: addDetail.email, $push: { items: { ...data } } }, { new: true },
          function (err, result) {
            if (err) {
              console.log(err);
            } else {
              let mailOptions = {
                from: `"NVIKTOUS"`,
                to: addDetail.email,
                subject: "Ordered Confrimed ",
                // text: req.body.content,
                html:
                  `<h2>Your Order ID is ${data._id}</h2>
	                 <p>you can track your order by login into your account</p> `
              }
              transporter.sendMail(mailOptions, function (err, dat) {
                if (err) {
                  console.log(err);
                }
              });
              res.send(result);
            }
          }
        );
      }
    });
  }
  else {
    res.send("unauthorized");
  }
})








module.exports = router;