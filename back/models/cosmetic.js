const mongoose = require("mongoose");

const cosmeticSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  place: { type: String, required: true },
});

module.exports = mongoose.model("Cosmetic", cosmeticSchema);
