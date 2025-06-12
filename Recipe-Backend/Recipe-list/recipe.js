
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");


const getRecipesRoute = require("../Recipe-list/api_routes/getRecipe");
const viewRecipeRoute = require("../Recipe-list/api_routes/viewRecipe");
const addRecipeRoute = require("../Recipe-list/api_routes/addRecipe");
const deleteRecipe = require("../Recipe-list/api_routes/deleteRecipe");
const registerUser = require("../Recipe-list/api_routes/registerUser");
const loginUser = require('../Recipe-list/api_routes/login');
const favRecipe = require('../Recipe-list/api_routes/favRecipe');

const app = express();
const port = 4100;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", getRecipesRoute);
app.use("/api", viewRecipeRoute);
app.use("/api", addRecipeRoute);
app.use("/api", deleteRecipe);
app.use("/api", registerUser);
app.use("/api", loginUser);
app.use("/api",favRecipe)


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
