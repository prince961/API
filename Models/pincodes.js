const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pincodeSchemas = new Schema({
  
    Pincode: {
        type: String, 
        required: true 

      },
      City:{
          type:String,
          required:true,
      }, 
      State:{
          type:String,
          required:true
      },
      
      DEST:
          {
              type:Object,
              REGION: {
                  type:String,
                  required:true
              }
          },
      Zone:{
          type:String,
          required:true
      },
      Prepaid:{
          type:String,
          required:true
      },
      COD :{
          type:String,
          required:true
     }, 
     ReversePickup : {
         type:String,
         required:true
     },
      ForwardPickup: {
         type:String,
         required:true
     },
    DestinationCategory: {
         type:String,
         required:true
     },
});

const Pincodes = mongoose.model("_pincode", pincodeSchemas);
module.exports = Pincodes;
