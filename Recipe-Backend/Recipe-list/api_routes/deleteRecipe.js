const exp = require('express');
const router = exp.Router();
const db = require('../db');


router.delete('/recipe/:id', (req, res) => {
  const recipeId = req.params.id;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Delete from recipe_process
    const deleteRecipeProcessSql = "DELETE FROM recipe_process WHERE recipe_id = ?";

    db.query(deleteRecipeProcessSql, [recipeId], (err, result) => {
      if (err) {
        return db.rollback(() => {
          console.error("Error deleting from recipe_process:", err);
          res.status(500).json({ error: "Internal server error" });
        });
      }

      // Delete from recipe_list
      const deleteRecipeListSql = "DELETE FROM recipe_list WHERE id = ?";

      db.query(deleteRecipeListSql, [recipeId], (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error deleting from recipe_list:", err);
            res.status(500).json({ error: "Internal server error" });
          });
        }

        // Commit transaction if both deletes are successful
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error committing transaction:", err);
              res.status(500).json({ error: "Internal server error" });
            });
          }

          // Check if recipe was deleted
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Recipe not found" });
          }

          res.status(200).json({ message: "Recipe deleted successfully" });
        });
      });
    });
  });
});



module.exports = router;