const express = require("express");
const { getProducts } = require("../controllers/productController");
// Middleware que permite proteger la ruta
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Ruta protegida para obtener los productos
router.get("/", authenticateToken, getProducts);

module.exports = router;
