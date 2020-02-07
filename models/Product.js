const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  productName: String,
  description: String,
  category: String,
  price: Number,
  availability: Number,
  urlImageProduct: String,
});

module.exports = mongoose.model("Product", Product);
