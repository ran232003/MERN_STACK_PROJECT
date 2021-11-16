const mongoose = require('mongoose');

userSchema = mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
    },
    password:String,
    image:String,
    places:[{
        type:mongoose.Types.ObjectId,
        ref:"Place"
    }]  
})

const User = mongoose.model("User",userSchema);
module.exports = User;