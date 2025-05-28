const exp = require('express');
const db = require('../db');
const router = exp.Router();
const bcrypt = require('bcrypt')

router.post('/register_user',(req,res)=>{
    const {username,password,createdat} = req.body;

    if(!username || !password || !createdat){
        return res.status(400).json({message:'Username and Password are Required'})
    }

    const usersql = 'Select * from users where user_name = ?';
    db.query(usersql,[username],async (err,result)=>{
        if(err){
            return res.status(500).json({Error:"Database Error",error:err})
        }
        if(result.length > 0){
            return res.status(409).json({Error:"Username already taken"})
        }

        const encryptedPassword = await bcrypt.hash(password,10);

        const sql = "Insert into users (user_name,user_password,created_at) values (?,?,?)"
        db.query(sql,[username,encryptedPassword,createdat],(err,result)=>{
            if(err){
                return res.status(500).json({Error:"Insert Failed",error:err})
            }
            else{
                return res.status(200).json({Success:"User Created Successfully"})
            }
        })
    })
  
})

module.exports = router