const { v4: uuidv4 } = require('uuid');
const User = require("../models/UserSchema");
const users = require('../dummyUsers');
const myError = require('../models/myError');
const myValidation = require('../models/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const usersList = async(req,res,next)=>{
    //get all users without passwords.
    let users = await User.find({},'-password');
    if(!users){
        const error = new myError("no users found",404);
        return next(error);

    }
    // users = users.map((user)=>{
    //     return user.toObject({getters: true})
    // })
    res.json({users:users});
}

const signUp = async(req,res,next)=>{
    let{email,password,name} = req.body;
    let image = req.file;
    console.log(req.file);
    console.log("email",email);
    const validatorEmail = new myValidation(email);
    const validatorPassword = new myValidation(password);
    validatorEmail.maxSize = 15;
    validatorEmail.minSize = 5;
    console.log(image);
    email = email.trim();
    password = password.trim();
    const valid = validatorEmail.check();
    if(valid === false){
        const dbUser = await User.findOne({email: email}).exec();
        //returning object that email === to the db email
        console.log(dbUser)
        if(dbUser){
            const error = new myError("This Email is in The System, Please Try To Login",500);
            return next(error);
        }
        
    }
    try{
    const hashPassword = await bcrypt.hash(password,12);
    let user = new User({
        email:email,
        password:hashPassword,
        image:'http://localhost:5000/' + image.path.replace(/\\/g, "/"),
        name:name
    })
     // if(user){
     //     const error = new myError("email is alredy in the system",500);
     //     return next(error);
     // }
     // const newUser = {
     //     password:password,
     //     email:email,
     //     name:name,
     //     id:uuidv4()
     // }
     // users.push(newUser);
     await user.save();
     let token = jwt.sign({userId:user._id},"myKey",{expiresIn:'3h'})
     res.send({
         newUser:user,
         login:true,
         userId:user._id,
         token:token,
     
     })
    }catch(e){
        const myerror = new myError("fail to create new User",500);
        return next(myerror);
    }
   //let user = users.find((item)=>item.email === email)


}
const login = async(req,res,next)=>{
    const{email,password} = req.body;
    console.log("in login",email,password)
    const user = await User.findOne({email:email}).exec();
    if(!user){
        console.log("login controller");
        const myerror = new myError("User Not found, Please Try Again",404);
       return next(myerror);
    }
    //user = users.find((item)=>item.email === email && item.password === password)
    try{
    const checkPassword = await bcrypt.compare(password,user.password)
    console.log("checkPassword",checkPassword);
    if(!checkPassword){
        const myerror = new myError("User Not found, Please Try Again",404);
        return next(myerror); 
    }
    const token = jwt.sign({userId:user._id},"myKey",{expiresIn:"3h"});
    console.log("token",token);
    return res.json({login:true,userId:user._id,token:token})
    }catch(e){
        const myerror = new myError("fail",500);
        return next(myerror);
    }
    // if(!user){
    //     const error = new myError("user not exist",404);
    //     return next(error);
    // }
    
}
const test = (req,res,next)=>{
    console.log("in test",req.file);
}

module.exports = {
    usersList:usersList,
    signUp:signUp,
    login:login,
    test:test,
};