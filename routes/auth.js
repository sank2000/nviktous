require('dotenv').config()

const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require("passport");
const { v5: uuidv5 } = require('uuid');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 5;

const User = require('../model/user');


router.use(session(
  {
    secret: "nviktous secret",
    resave: false,
    saveUninitialized: false
  }
));

router.use(passport.initialize());
router.use(passport.session());



passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, 'Email id not exists....... ');
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result == true) {
          return done(null, user);
        }
        else {
          return done(null, false, 'Incorrect password...... ');
        }
      });

    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:4000/auth/google/auth"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ unique_id: profile.id }, { username: profile._json.name, email: profile._json.email }, function (err, user) {
      return cb(err, user);
    });
  }
));


passport.use(new FacebookStrategy({
  clientID: process.env.FCLIENT_ID,
  clientSecret: process.env.FCLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/auth",
  profileFields: ['id', 'emails', 'name']
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile._json);
    User.findOrCreate({ unique_id: profile.id }, { username: profile._json.first_name, email: profile._json.email }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get('/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }))


router.get('/google/auth', function (req, res, next) {
  passport.authenticate('google', function (err, user) {
    if (err) {
      console.log(err.code);
      return res.json({
        message: err.code,
        auth: false,
      });
    }
    if (!user) {
      return res.json({
        message: "Cannot access user",
        auth: false,
      });
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      console.log(user);
      return res.json({
        message: 'You are  logged in!',
        auth: true,
        data: user
      });
    });
  })(req, res, next);
});

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] }));



router.get('/facebook/auth', function (req, res, next) {
  passport.authenticate('facebook', function (err, user) {
    if (err) {
      console.log(err.code);
      return res.json({
        message: err.code,
        auth: false,
      });
    }
    if (!user) {
      return res.json({
        message: "Cannot access user",
        auth: false,
      });
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      console.log(user);
      return res.json({
        message: 'You are  logged in!',
        auth: true,
        data: user
      });
    });
  })(req, res, next);
});


router.post("/register", function (req, res, next) {
  console.log(req.body);
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const ud = new User({
      unique_id: uuidv5(req.body.email, uuidv5.DNS),
      // unique_id: 10,
      email: req.body.email,
      name: req.body.name,
      password: hash
    });
    ud.save(function (err, doc) {
      if (err) {
        console.error(err);
        res.json({
          message: err.code,
          auth: false,
        });
      }
      else {
        passport.authenticate('local', function (err, user, info) {
          if (err) {
            console.log(err);
            return res.json({
              message: err.code,
              auth: false,
            });
          }
          if (!user) {
            console.log(info);
            return res.json({
              message: info,
              auth: false,
            });
          }
          req.logIn(user, function (err) {
            if (err) { return next(err); }
            console.log(user);
            const { password, ...data } = user._doc;
            return res.json({
              message: 'You are  logged in!',
              auth: true,
              data: data
            });
          });
        })(req, res, next);
      }
    });
  });

});





router.post("/login", function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log(err);
      return res.json({
        message: err.code,
        auth: false,
      });
    }
    if (!user) {
      console.log(info);
      return res.json({
        message: info,
        auth: false,
      });
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      console.log(user);
      const { password, ...data } = user._doc;
      return res.json({
        message: 'You are  logged in!',
        auth: true,
        data: data
      });
    });
  })(req, res, next);
});






router.get("/logout", function (req, res) {
  req.logOut();
  res.json({
    auth: false
  });
});







router.get("/", function (req, res) {

  if (req.isAuthenticated()) {
    res.json({
      message: 'You are  logged in!',
      auth: true,
    });
  }
  else {
    res.json({
      message: 'You are not logged in!',
      auth: false,
    });
  }
});










module.exports = router;

