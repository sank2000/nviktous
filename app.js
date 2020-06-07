require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const cors = require("cors");





const auth = require('./routes/auth');
const posts = require('./routes/posts');
const user = require('./routes/user');


const app = express();


app.use(session(
  {
    secret: "nviktous secret",
    resave: false,
    saveUninitialized: false
  }
));

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth);
app.use('/posts', posts);
app.use('/user', user);

app.use(cors);

const dbConnection = mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});





app.listen(process.env.PORT || 4000, () => {
  console.log("Server started.");
});


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}