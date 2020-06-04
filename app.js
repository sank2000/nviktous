require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const auth = require('./routes/auth');

const app = express();



app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth);



mongoose.connect("mongodb://localhost:27017/NVIKTOUS", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);




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