require('dotenv').config
const mysql = require("mysql2");
const url = require('url');

const dbUrl = process.env.DATABASE_URL;
const params = url.parse(dbUrl);
const [user,password] = params.auth.split(':');

const db = mysql.createConnection({
  host: params.hostname,
  port: params.port,
  user: user,
  password: password,
  database: params.pathname.replace('/', ''),

})

console.log("DB",db)


db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Database connected successfully");
  }
});

module.exports = db; 