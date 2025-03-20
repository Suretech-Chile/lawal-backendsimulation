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

router.get("/", authenticateToken, getProducts);
router.post("/", authenticateToken, addProduct);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

router.get("/topSales", authenticateToken, getTopProducts);

module.exports = router;
