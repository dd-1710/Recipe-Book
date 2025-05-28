const exp = require('express');
const router = exp.Router();
const db = require('../db');


router.delete('/recipe/:id', (req, res) => {
  const recipeId = req.params.id;

  const sql = "DELETE FROM recipe_list WHERE id = ?";

  db.query(sql, [recipeId], (err, result) => {
    if (err) {
      console.error("Error deleting recipe:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  });
});


module.exports = router;