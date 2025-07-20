# 🍽️ Full Stack Recipe App

A full-featured recipe management application built with **Angular**, **Node.js**, and **MySQL**. This app allows users to explore, create, and manage a variety of recipes, while also offering user authentication, search filters, and the ability to mark favorite dishes.

---

## 🚀 Features

### 🔐 User Authentication
- Login with credentials
- Signup for new users
- Sign out securely
- JWT-based session handling

### 🧾 Recipe Management
- View a list of ~30 categorized recipe cards
- Categories: **Breakfast, Juices, Smoothies, Lunch, Dinner, Snacks**
- Search recipes by name or category
- View recipe details:
  - Dish name
  - Preparation time & Cooking time
  - Ingredients
  - Step-by-step procedure
  - Dish image
- Authenticated users can:
  - ➕ Create a recipe
  - ✏️ Edit their own recipes
  - ❌ Delete their own recipes
  - ❤️ Mark/unmark any recipe as favorite

---

## 🛠️ Tech Stack

| Layer         | Technology            |
|---------------|------------------------|
| **Frontend**  | Angular (v18), Angular Material, TypeScript, HTML5,CSS |
| **Backend**   | Node.js, Express.js    |
| **Database**  | MySQL                  |
| **Auth**      | JWT, bcrypt            |
| **Tools**     | Postman, Git, GitHub   |

---

#project structure

📦 Recipe-Book
 ┣ 📂 Recipe-App/         # Angular UI frontend   
 ┣ 📂 Recipe-Backend/       # Node.js + Express backend
 ┣ 📄 package.json           # Project metadata and dependencies
 ┣ 📄 package-lock.json      # Locked versions of dependencies
 ┣ 📄 README.md              # Project documentation
 ┗ 📄 .env                   # Environment variables


bash 
#Frontend
git clone -b main https://github.com/dd-1710/DD.git
cd Recipe-app
npm i
ng serve

#Backend

To connect to DB create a .env file 

JWT_SECRET="your_secret_key_here"
DATABASE_URL=mysql://user:password@host:port/recipe_book
(For Ex : DATABASE_URL=mysql://root:root@localhost:3306/recipe_book) #this is just for understanding 
PORT=2000

cd Recipe-Backend/Recipe-list
npm i
node recipe.js


Please Refer UI-Images folder for quick view of UI



