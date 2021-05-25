const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const companySchema = new Schema({
  companyName: String,
  services: [
    {
      serviceName: String,
      rates: { type: Schema.Types.ObjectId, ref: "rate" },
    },
  ],
});

module.exports = mongoose.model("Company", companySchema);

companySchema.methods.addRate = function (company) {
  console.log("Adding....");
};
