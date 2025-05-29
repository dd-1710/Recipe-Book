const jwt = require('jsonwebtoken');
const exp = require('express');
const router = exp.Router();



function verifyToken(req,res,next){
  const authheader = req.headers['authorization'];
   
  if(!authheader){
     return res.status(404).json({Error:  'Authorization Header Is Not Present!!'})
  }

  const token = authheader.split(' ')[1];

  if(!token){
    return res.status(401).json({Error:'Token is missing or undefined!!'})
  }

  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
      return res.status(403).json({Error:"Invalid or expired Token!!"})
    }
    req.user = user;
    next();
  })
}

module.exports = verifyToken;