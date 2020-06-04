const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema(
  {
    unique_id: String,
    name: String,
    email: String,
    password: String,
  }
)

userSchema.plugin(findOrCreate);

const User = mongoose.model('loginDetails', userSchema);

module.exports = User;