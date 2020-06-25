const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: String,
    available: { type: Boolean, default: true },
    img: Array,
    size: Array,
    price: Number,
    discount: { type: Number, default: 0 }
  }, {
  timestamps: true
}
)


const Product = mongoose.model('productDetails', productSchema);

module.exports = Product;