const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type: String,
        required: [true,'name is required']
    },
    password:{
        type: String,
        required: [true,'email is required']
    }
});    

const User = mongoose.model('ninjas',userSchema);
module.exports = User; 