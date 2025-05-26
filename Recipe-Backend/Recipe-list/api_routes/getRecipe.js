const express = require("express");
const router = express.Router();
const db = require("../db"); 


router.get("/get_recipe", (req, res) => {
  const sql = "SELECT * FROM recipe_list";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching recipes:", err);
      return res.status(500).send("Error while fetching recipe data");
    }

    res.json(result);
  });
});

module.exports = router;
