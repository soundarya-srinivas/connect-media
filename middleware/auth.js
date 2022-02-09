
const jwt =require("jsonwebtoken")
const mongoose= require("mongoose")
const User = require('../models/User')
const ErrorResponse=require("../utils/errorResponse")

module.exports =async(req,res,next)=>{
    const {authorization}= req.headers;
    let token
    if(!authorization){
        res.status(401).json({error:"you must log in"});
        
    }
    if(authorization && authorization.startsWith("Bearer")){
        token =authorization.split(" ")[1]
    }
    try {
       const decoded = jwt.verify(token,process.env.JWT_SECRET)

       const user = await User.findById(decoded.id)
       if(!user){
           return next(new ErrorResponse("No user found",404))
       }
          req.user = user ;
          next();
          
      
        
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access",401))
    }
 
    
}