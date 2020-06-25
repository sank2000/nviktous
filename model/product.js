const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

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
);

productSchema.plugin(random);


const Product = mongoose.model('productDetails', productSchema);

module.exports = Product;