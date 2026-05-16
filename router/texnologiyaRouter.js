const express = require('express');

const router = express.Router();

const texnologiyaController = require('../controllers/texnologiyaController')

router.get("/", texnologiyaController.getAllTexnologiyalar);
router.get("/:id", texnologiyaController.getTexnologiyaById);
router.post("/", texnologiyaController.createTexnologiya);
router.put("/:id", texnologiyaController.updateTexnologiya);
 router.delete("/:id", texnologiyaController.deleteTexnologiya);

module.exports = router;