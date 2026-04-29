const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routerləri çağırmaq
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

// Marşrutları tətbiqə qoşmaq
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});