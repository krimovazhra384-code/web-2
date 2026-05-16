const db = require("../db");


exports.getAllTexnologiyalar = (req, res) => {
  const sql = "SELECT * FROM sirketler";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error getting texnologiyalar" });
    }

    res.json(result);
  });
};

exports.getTexnologiyaById = (req, res) => {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const sql = "SELECT * FROM sirketler WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error getting texnologiya" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Texnologiya not found" });
    }

    res.json(result[0]);
  });
};

exports.createTexnologiya = (req, res) => {
  const { ad, merkez_qerargah, tesis_ili, bazar_deyeri_milyard, vebsayt, logo_linki } = req.body;

 
  if (!ad || ad.trim() === "") {
    return res.status(400).json({ message: "Name (ad) is required" });
  }

 
  if (ad.length < 2) {
    return res.status(400).json({ message: "Name (ad) must be at least 2 characters" });
  }


  if (tesis_ili && (isNaN(tesis_ili) || tesis_ili < 0)) {
    return res.status(400).json({ message: "Valid foundation year (tesis_ili) is required" });
  }

 
  if (!logo_linki || logo_linki.trim() === "") {
    return res.status(400).json({ message: "Logo link (logo_linki) is required" });
  }

  const sql = "INSERT INTO sirketler (ad, merkez_qerargah, tesis_ili, bazar_deyeri_milyard, vebsayt, logo_linki) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [ad, merkez_qerargah, tesis_ili, bazar_deyeri_milyard, vebsayt, logo_linki], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error creating texnologiya" });
    }

    res.status(201).json({
      message: "Texnologiya created successfully",
      texnologiyaId: result.insertId
    });
  });
};

exports.updateTexnologiya = (req, res) => {
  const id = req.params.id;
  const { ad, merkez_qerargah, tesis_ili, bazar_deyeri_milyard, vebsayt, logo_linki } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }


  if (!ad || ad.trim() === "") {
    return res.status(400).json({ message: "Name (ad) is required" });
  }

  if (!logo_linki || logo_linki.trim() === "") {
    return res.status(400).json({ message: "Logo link (logo_linki) is required" });
  }

  const sql = "UPDATE sirketler SET ad = ?, merkez_qerargah = ?, tesis_ili = ?, bazar_deyeri_milyard = ?, vebsayt = ?, logo_linki = ? WHERE id = ?";

  db.query(sql, [ad, merkez_qerargah, tesis_ili, bazar_deyeri_milyard, vebsayt, logo_linki, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating texnologiya" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Texnologiya not found" });
    }

    res.json({ message: "Texnologiya updated successfully" });
  });
};


exports.deleteTexnologiya = (req, res) => {
  const id = req.params.id;

 
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const sql = "DELETE FROM sirketler WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting texnologiya" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Texnologiya not found" });
    }

    res.json({ message: "Texnologiya deleted successfully" });
  });
};