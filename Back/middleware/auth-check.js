const jwt = require("jsonwebtoken");
const myError = require("../models/myError");
const authCheck = (req,res,next)=>{
    try{
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer.split(" ")[1];
        if(!token){
            throw new myError("auth faild");
        }
        const decodedToken = jwt.verify(token,"myKey");
        req.userIdObject = {userId:decodedToken.userId};
        next();


    }catch(e){
        next(e)
    }

}
module.exports = authCheck