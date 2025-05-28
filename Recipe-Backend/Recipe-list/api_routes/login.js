const exp = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = exp.Router();

router.get('/login',(req,res)=>{
    const {username,password} = req.query;

    const sql = "Select * from users where user_name = ?";

    db.query(sql,[user_name],async (err,result)=>{
       
        if(result.length > 0)
        {
            const comparePassword = await bcrypt.compare(req.query.password,result[0].user_password)
            if(comparePassword && req.query.username == res[0].user_name){
             return res.status(200).json({Success:"User is Successfully Logged In"})
        }
           
        }
        
    })
})

module.exports = router;