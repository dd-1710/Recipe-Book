const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/favRecipe',(req,res)=>{
    const {user_id,recipe_id} = req.body;

    if(!user_id || !recipe_id){
        return res.status(400).json({message:'User Id or RecipeId is missing '});
    }

    const sql = "Select * from user_bookmarks where user_id=? AND recipe_id=?";

    db.query(sql,[user_id,recipe_id],(err,result)=>{
        if(err){
            return res.status(500).json({message:'DB Error'});
        }
        if(result.length > 0){
            const deleteSql = "Delete from user_bookmarks where user_id=? AND recipe_id=?";
            db.query(deleteSql,[user_id,recipe_id],(err,result)=>{
                if(err){
                    return res.status(500).json({message:"Delete Failed"});
                     
                }
               return res.json({bookmarked:false})
              
                
            })
        }
        else{
                    const sqlInsert = "Insert into user_bookmarks(user_id,recipe_id) values (?,?)";
                    db.query(sqlInsert,[user_id,recipe_id],(err,result)=>{
                        if(err){
                            return res.status(500).json({message:"Error while inserting"});
                        }
                        return res.json({bookmarked:true})
                    })
                }
    })
})

module.exports = router;