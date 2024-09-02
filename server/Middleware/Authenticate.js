const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../Model/User')

async function authenticate(req,res,next){
    try{
    const token =  req.header("Authorization");
    if(!token){
        return res.send({code:404, message:"Authorization token missing"})
    }
    const tokenWB = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenWB,"secret-token")
    const UserDetails = await User.findOne({rollNumber:decoded.rollNumber,token:tokenWB})
    if(UserDetails){
        req.user = UserDetails;
        req.token = tokenWB;
        next(); // Call next to proceed to the next middleware or route handler
    }else {
        return res.status(401).json({ message: "Authentication failed" });
    }

  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res
        .status(500)
        .json({ status: 500, message: "Token has expired. Please login" });
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

}

module.exports = authenticate