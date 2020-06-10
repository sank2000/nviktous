const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema(
  {
    unique_id: String,
    account_Type: String,
    name: String,
    email: String,
    password: String,
    address: { type: String, default: "" },
    phn: { type: String, default: "" },
    pincode: { type: String, default: "" },
    favItem: { type: Array, default: [] },
    card: { type: Array, default: [] },
    items: { type: Array, default: [] }
  }
)

userSchema.plugin(findOrCreate);

const User = mongoose.model('loginDetails', userSchema);

module.exports = User;