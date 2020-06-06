const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: String,
    img: Array,
    size: Array,
    color: Array,
    price: Number,
    discount: { type: Object, default: { per: 0 } }
  }
)


const Product = mongoose.model('productDetails', productSchema);

module.exports = Product;