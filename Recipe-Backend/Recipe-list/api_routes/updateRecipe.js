const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");

const router = express.Router();
const verifyToken = require("../userAuth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

router.put("/edit_recipe/:id", verifyToken, upload.single("image"), (req, res) => {
  const recipeId = req.params.id;
  const {
    recipename,
    recipedesc,
    preptime,
    cookingtime,
    ingredients,
    procedure,
    serves,
    category
  } = req.body;

  const imgname = req.file ? req.file.originalname : req.body.oldImg;

  const updateRecipeSql = `
    UPDATE recipe_list SET 
      recipe_name = ?, 
      recipe_desc = ?, 
      img_path = ?, 
      category = ?
    WHERE id = ?`;

  db.query(updateRecipeSql, [recipename, recipedesc, imgname, category, recipeId], (err) => {
    if (err) return res.status(500).json({ message: "Error updating recipe list" });

    const updateProcessSql = `
      UPDATE recipe_process SET 
        preparation_time = ?, 
        cooking_time = ?, 
        ingredients = ?, 
        recipe_procedure = ?, 
        serve = ?
      WHERE recipe_id = ?`;

    db.query(updateProcessSql, [preptime, cookingtime, ingredients, procedure, serves, recipeId], (err2) => {
      if (err2) return res.status(500).json({ message: "Error updating recipe process" });

      res.status(200).json({ message: "Recipe updated successfully" });
    });
  });
});

module.exports = router