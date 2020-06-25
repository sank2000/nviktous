const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user_id: String,
    address: String,
    amount: Number,
    count: Number,
    item: { type: Array },
    status: { type: Array },
    payment: Object
  }, {
  timestamps: true
}
)


const Order = mongoose.model('orderDetails', orderSchema);

module.exports = Order;