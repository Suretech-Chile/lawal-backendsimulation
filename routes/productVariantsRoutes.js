const express = require("express");
const {
  getProductVariants,
  getProductVariantById,
  getVariantsByProductId,
  addProductVariant,
  updateProductVariant,
  deleteProductVariant,
  getTopProductVariants,
  getOutOfStockVariants,
  getVariantsByState,
  getVariantsGroupedByNameStateAndMedida,
  getTopVariantsGroupedByNameStateAndMedida
} = require("../controllers/productVariantsController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.use(authenticateToken);

// Obtener datos
router.get("/", getProductVariants);
router.get("/topSales", getTopProductVariants);
router.get("/outOfStock", getOutOfStockVariants);
router.get("/grouped", getVariantsGroupedByNameStateAndMedida);
router.get("/topSales/grouped", getTopVariantsGroupedByNameStateAndMedida);
router.get("/product/:productId", getVariantsByProductId);
router.get("/state/:state", getVariantsByState);
router.get("/:id", getProductVariantById); // Al final

// Modificar datos
router.post("/", addProductVariant);
router.put("/:id", updateProductVariant);
router.delete("/:id", deleteProductVariant);

module.exports = router;