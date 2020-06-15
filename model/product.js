const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: String,
    img: Array,
    size: Array,
    price: Number,
    discount: { type: Number, default: 0 }
  }
)


const Product = mongoose.model('productDetails', productSchema);

module.exports = Product;