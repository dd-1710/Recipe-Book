const express = require("express");
const router = express.Router();
const db = require("../db"); 


router.get("/viewRecipe/:recipeId", (req, res) => {
  const recipeId = req.params.recipeId;

  const sql = `
    SELECT * 
    FROM recipe_list 
    JOIN recipe_process 
    ON recipe_list.id = recipe_process.recipe_id
    WHERE recipe_list.id = ?
  `;

  db.query(sql, [recipeId], (err, result) => {
    if (err) {
      console.error("Error while fetching recipe:", err);
      return res.status(500).send("Server Error");
    }

    if (result.length === 0) {
      return res.status(404).send("Recipe Not Found");
    }

    res.json(result[0]);
  });
});

module.exports = router;
