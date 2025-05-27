const exp = require('express');
const db = require('../db');
const router = exp.Router();

router.post('/login',(req,res)=>{
    const {username,password} = req.body;
  
})