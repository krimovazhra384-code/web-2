const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_password",
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
  password: "your_password",
  database: "texnologiya_db" // Bura yeni bazanın adını yazdıq
});

texnoDb.connect((err) => {
  if (err) {
    console.error("Texnologiya DB connection failed:", err.message);
    return;
  }
  console.log("Connected to Texnologiya MySQL");
});

// Hər iki bağlantını digər fayllarda istifadə edə bilmək üçün obyekt şəklində ixrac edirik
module.exports = { db, texnoDb };