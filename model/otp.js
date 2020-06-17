const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  doc_id: { type: String, required: true },
  OTP: { type: Number, required: true }
}, {
  timestamps: true
});

const OTP = mongoose.model("otpDatas", OTPSchema);

module.exports = OTP;
