const mongoose = require("mongoose");

const gadgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  sale: { type: Boolean, default: false },
  price: { type: Number, required: true },
  salePrice: { type: Number, default: null },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Gadget", gadgetSchema);
