const express = require("express");
const db = require("./db");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// WEEK 5 ACTIVITY: Get products from Database
app.get("/products", (req, res) => {
    const sql = "SELECT * FROM products";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Error fetching products");
        }
        // This sends your MySQL data to the web page
        res.json(results);
    });
});