const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
    title:String,
    desc:String,
    image:String,
    address:String,
    location:{
        lat:Number,
        lng:Number,
    },
    creatorId:{
      type:mongoose.Types.ObjectId,
      ref:"User"
    }
})

const Place = mongoose.model("Place",placeSchema);

module.exports = Place;