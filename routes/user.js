const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");


const Product = require('../model/product');
const User = require('../model/user');
const Order = require('../model/order');
const OTP = require('../model/otp');

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
  const payment = JSON.parse(req.body.payment);
  if (req.isAuthenticated()) {
    const ord = new Order(
      {
        user_id: req.user._id,
        address: addDetail.address + " - " + addDetail.pincode,
        amount: product.price,
        count: product.count,
        payment: payment,
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


router.get("/sendmail", function (req, res) {
  if (req.isAuthenticated()) {
    var num = Math.floor(Math.random() * 900000) + 100000;
    OTP.findOneAndUpdate({ doc_id: req.user._id }, { OTP: num }, function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        if (result === null) {
          const nOtp = new OTP(
            {
              doc_id: req.user._id,
              OTP: num
            }
          );
          nOtp.save(function (err) {
            if (err) {
              console.log(err);
            }
          });
        }
      }
    });

    let mailOptions = {
      from: '"NVIKTOUS" nviktousofficial@gmail.com',
      to: req.user.email,
      subject: "OTP to verify Order",
      html: `
		<h3>Your OTP to verify order is:</h3> 
		<h1>${num}</h1>
		<h4>If you don't know why you're getting this email, consider changing your password to avoid your account being misused/ locked.</h4>
		`
    };
    transporter.sendMail(mailOptions, function (err, dat) {
      if (err) {
        console.log(err);
        res.json({
          msg: "Unable to send Email",
          done: false
        });
      }
      else {
        res.json({
          msg: "Mail sent Successfully",
          done: true
        });
      }
    });
  }
  else {
    res.send("unauthorized");
  }

});

router.post("/verify", function (req, res) {
  if (req.isAuthenticated()) {
    OTP.findOne({ doc_id: req.user._id, OTP: req.body.OTP }, function (err, result) {
      if (!err) {
        if (result) {
          res.json({
            verified: true
          });
        }
        else {
          res.json({
            verified: false
          });
        }
      }
      else {
        console.log(err);
      }
    });
  }
  else {
    res.send("unauthorized");
  }
});







module.exports = router;