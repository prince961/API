const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ratesSchema = new Schema({
  destination: [
    {
      name: String,
      weightCategory: [
        {
          category: String,
          min: Number,
          max: Number,
          weightDivisor: Number,
          price: Number,
          prevPrice: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("rate", ratesSchema);
