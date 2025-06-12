const express = require("express");
const router = express.Router();
const db = require("../db"); 


router.get("/get_recipe/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT 
      r.*, 
      CASE 
        WHEN ub.user_id IS NOT NULL THEN 1 
        ELSE 0 
      END AS is_bookmarked
    FROM recipe_list r
    LEFT JOIN user_bookmarks ub 
      ON r.id = ub.recipe_id AND ub.user_id = ?
  `;

  db.query(sql,[userId],(err, result) => {
    if (err) {
      console.error("Error fetching recipes:", err);
      return res.status(500).send("Error while fetching recipe data");
    }

    res.json(result);
  });
});

module.exports = router;      
