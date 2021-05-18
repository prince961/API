const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pincodeSchema = new Schema({
  pincode: [
    {
      id: { type: Number, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
  ],
});

const Pincode = mongoose.model("pincode", pincodeSchema);
module.exports = Pincode;
