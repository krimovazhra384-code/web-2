const db = require("../db");

// 1. GET ALL PRODUCTS (Kateqoriya adı ilə birlikdə)
exports.getAllProducts = (req, res) => {
  const sql = `
    SELECT p.*, c.name AS category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Məhsullar gətirilərkən xəta baş verdi" });
    }
    res.json(result);
  });
};

// 2. GET PRODUCT BY ID
exports.getProductById = (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Yanlış ID formatı" });
  }

  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Məhsul tapılarkən xəta baş verdi" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }
    res.json(result[0]);
  });
};

// 3. CREATE PRODUCT
exports.createProduct = (req, res) => {
  const { name, price, category_id } = req.body;

  // Validasiya
  if (!name || !price || !category_id) {
    return res.status(400).json({ message: "Ad, qiymət və kateqoriya mütləqdir" });
  }

  const sql = "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)";
  db.query(sql, [name, price, category_id], (err, result) => {
    if (err) {
      // Xarici açar (category_id) mövcud olmaya bilər
      return res.status(500).json({ message: "Məhsul yaradıla bilmədi. Kateqoriya ID-ni yoxlayın." });
    }
    res.status(201).json({
      message: "Məhsul uğurla yaradıldı",
      productId: result.insertId
    });
  });
};

// 4. UPDATE PRODUCT
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price, category_id } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Yanlış ID" });
  }

  const sql = "UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?";
  db.query(sql, [name, price, category_id, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Yenilənmə zamanı xəta" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }
    res.json({ message: "Məhsul uğurla yeniləndi" });
  });
};

// 5. DELETE PRODUCT
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Yanlış ID" });
  }

  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Silinmə zamanı xəta" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Məhsul tapılmadı" });
    }
    res.json({ message: "Məhsul uğurla silindi" });
  });
};