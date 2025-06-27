const exp = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = exp.Router();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET


router.post('/login',(req,res)=>{
    const {username,password} = req.body;

    const sql = "Select * from users where user_name = ?";

    db.query(sql,[username],async (err,result)=>{
    
       
       if(err){
        return res.status(500).json({Error:'DataBase Error!!',err})
       }
       if(result.length == 0 ){
        return res.status(401).json({Error:'User Not Found!!'})
       }
        const user = result[0];
      
        const match = await bcrypt.compare(password,user.user_password);

        if(!match){
             return res.status(401).json({Error:'User or Password Is Invalid!!'})
        }

        if(!secret){
          console.log("Secret key is not found")
        }

        const token = jwt.sign({
          "username": username,
          "userId": user.id},
          secret,
          {expiresIn:'1h'}
     )
         return res.status(200).json({Success:`User  ${username} Found!!`,token,userId:user.id,username:username})
    })
})

module.exports = router;