const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getTopProducts
} = require("../controllers/productController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.use(authenticateToken);

// Obtener datos
router.get("/", getProducts);
router.get("/topSales", getTopProducts);

// Modificar datos
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
