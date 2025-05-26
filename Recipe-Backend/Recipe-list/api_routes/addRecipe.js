const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db"); 

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });


router.post("/add_recipe", upload.single("image"), (req, res) => {
  const {
    recipename,
    recipedesc,
    preptime,
    cookingtime,
    ingredients,
    procedure,
    serves,
  } = req.body;

  const imgname = req.file ? req.file.originalname : null;


  if (
    !recipename ||
    !recipedesc ||
    !imgname ||
    !preptime ||
    !cookingtime ||
    !ingredients ||
    !procedure ||
    !serves
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }


  const recipeSql = `
    INSERT INTO recipe_list (recipe_name, recipe_desc, img_path) 
    VALUES (?, ?, ?)`;
  const recipeValues = [recipename, recipedesc, imgname];

  db.query(recipeSql, recipeValues, (err, result) => {
    if (err) {
      console.error("Error inserting into recipe_list:", err);
      return res.status(500).json({ message: "Failed to save recipe" });
    }

    const recipeId = result.insertId;

    // ✅ Insert into recipe_process table
    const processSql = `
      INSERT INTO recipe_process 
      (id, preparation_time, cooking_time, ingredients, recipe_procedure, serve) 
      VALUES (?, ?, ?, ?, ?, ?)`;

    const processValues = [
      recipeId,
      preptime,
      cookingtime,
      ingredients,
      procedure,
      serves,
    ];

    db.query(processSql, processValues, (err2) => {
      if (err2) {
        console.error("Error inserting into recipe_process:", err2);
        return res.status(500).json({ message: "Failed to save cooking details" });
      }

      res.status(201).json({ message: "Recipe saved successfully" });
    });
  });
});

module.exports = router;
