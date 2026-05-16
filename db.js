const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2805",
  database: "ecommerce_db"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }

  console.log("Connected to MySQL");
});

module.exports = db;


const texnoDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2805",
  database: "texnologiya_db" 
});

texnoDb.connect((err) => {
  if (err) {
    console.error("Texnologiya DB connection failed:", err.message);
    return;
  }
  console.log("Connected to Texnologiya MySQL");
});


module.exports = { db, texnoDb };