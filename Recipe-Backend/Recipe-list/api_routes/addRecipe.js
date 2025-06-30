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

router.post("/add_recipe", verifyToken, upload.single("image"), (req, res) => {
  const user_Id = req.user.userId;
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

  const imgname = req.file ? req.file.originalname : null;

  if (
    !recipename ||
    !recipedesc ||
    !imgname ||
    !preptime ||
    !cookingtime ||
    !ingredients ||
    !procedure ||
    !serves ||
    !category
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicateSql = `SELECT * FROM recipe_list WHERE recipe_name = ? AND user_id = ?`;

  db.query(duplicateSql, [recipename, user_Id], (err, result) => {
    if (err) {
      console.error("Error checking duplicate:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: "Recipe name already exists, please try with another name!" });
    } else {
      const recipeSql = `
        INSERT INTO recipe_list (recipe_name, recipe_desc, img_path, user_id,category)
        VALUES (?, ?, ?, ?,?)`;
      const recipeValues = [recipename, recipedesc, imgname, user_Id,category];

      db.query(recipeSql, recipeValues, (err, result) => {
        if (err) {
          console.error("Error inserting into recipe_list:", err);
          return res.status(500).json({ message: "Failed to save recipe" });
        }

        const recipeId = result.insertId;

        const processSql = `
          INSERT INTO recipe_process 
          (recipe_id, preparation_time, cooking_time, ingredients, recipe_procedure, serve)
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
    }
  });
});

module.exports = router;
