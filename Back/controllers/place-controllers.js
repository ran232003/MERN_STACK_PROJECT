const { v4: uuidv4 } = require('uuid');
const addressToCoordintes = require('../axios.js/googleReq');
const Place = require('../models/PlaceSchema');

uuidv4();
var mongoose = require('mongoose');
let dummy = require('../DummyPlaces');
const myError = require('../models/myError');
const User = require('../models/UserSchema');

const getPlaceById = async(req,res,next)=>{
    console.log("test in places");
    let pid = req.params.pid;
    pid = mongoose.Types.ObjectId(pid);
    // const test = {
    //     messege:"msg"
    // };
    // const place = dummy.find((item)=>{
    //     console.log(item);
    //     if(item.id == pid){
    //         return item;
    // }})
    const place = await Place.findById(pid);
    console.log(place);
    if(typeof place === "undefined"){
        // res.status(404)
        // res.json({msg:"places not found"});
        // let error = new Error("places not found")
        // error.code = 404;
        error = new myError("place not found",404);
        next(error);
    }
    else{
    res.json({place:place.toObject({ getters: true})});
    }
}
const getPlacesByUser = async(req,res,next)=>{
    let userId = req.params.uid;
    userId = mongoose.Types.ObjectId(userId);
    // const userPlaces = dummy.filter((item)=>{
    //     if(item.creatorId == userId){
    //         return item;
    //     }
    // })
    const userPlaces = await Place.find({creatorId:userId}).exec();
    console.log("userPlaces",userPlaces);

    if(typeof userPlaces === "undefined"){
        // res.status(404).json({msg:"places not found"});
        // let error = new Error("places not found")
        // error.code = 404;
        // throw error
        const myError = new myError("places not found",404);
        throw myError;
    }
    else{
    res.json({userPlaces:userPlaces});
    }
    console.log(uuidv4());
}
 const createPlace= async(req,res,next)=>{
    //retriving the parameters from the body
    
    const{title,desc,address,creatorId} = req.body;
    console.log(req.body);
    let image = req.file;
    console.log("my image",image);
    const location = await addressToCoordintes(address);
    console.log(location);
    //mongoose.Types.ObjectId.isValid('your id here');
    const newCreatorId = mongoose.Types.ObjectId(creatorId);
    let user = await User.findById(newCreatorId);
    if(!user){
        const myerror = new myError("user not found",500);
      return next(myerror)
    }
    const userIdFromToken = req.userIdObject.userId;
    if(userIdFromToken === user.id.toString()){
        const newPlace = new Place({
            title:title,
            desc:desc,
            location:location,
            address:address,
            creatorId:user._id,
            image:'http://localhost:5000/' + image.path.replace(/\\/g, "/"),
        })
        user.places.push(newPlace);
        await user.save();
    try{
        await newPlace.save();
        dummy.push(newPlace);
        res.status(200);
        res.json({place:newPlace,user:user});
    }catch(e){
        console.log("err2")
        next(e);
    }

    }

     const myerror = new myError("user not found",500);
        next(myerror)
}
const editPlace = async (req,res,next)=>{
    let placeId = req.params.pid;
    const{title,desc} = req.body;
    placeId = mongoose.Types.ObjectId(placeId);
    console.log("req.userIdObject",req.userIdObject);
    const userId = req.userIdObject.userId
    let place = await Place.findById(placeId);
    //if i use creatorId i will get a string and not an object
    console.log(place.creatorId.toString(),userId);
    if(place.creatorId.toString() === userId){
        place.title = title;
    place.desc = desc;
    await place.save();
    // let index = dummy.findIndex((item)=>item.id == placeId);
    // console.log(index);
    // dummy[index].title = title;
    // dummy[index].desc = desc;

    res.status(200);
    return res.json({newPlace:place})
    }
    const myerror = new myError("user not found",500);
        next(myerror)
    

}
const deletePlace = async(req,res,next)=>{
    const placeId = req.params.pid;
    // dummy = dummy.filter((item)=>item.id != placeId)
    const userFromToken = req.userIdObject.userId;
    let place = await Place.findById(placeId);
    if(userFromToken === place.creatorId.toString()){
        const userId = place.creatorId;
        let user = await User.findById(userId);
        await User.updateOne({_id:userId},{$pull:{'places':placeId}}); 
        await Place.findByIdAndDelete(placeId);
        await user.save();
        res.status(200);
        return res.json({updatePlaces:dummy})
    }
    const myerror = new myError("user not found",500);
    next(myerror)
}

module.exports = {
    getPlaceById:getPlaceById,
    getPlacesByUser:getPlacesByUser,
    createPlace:createPlace,
    editPlace:editPlace,
    deletePlace:deletePlace
}