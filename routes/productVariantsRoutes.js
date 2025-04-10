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
  getVariantsGroupedByNameStateAndMedida, // Deprecated, no borrado por legacy
  getTopVariantsGroupedByNameStateAndMedida, // Deprecated, no borrado por legacy
  getVariantsForVentasFrontend,
  getTopVariantsForVentasFrontend
} = require("../controllers/productVariantsController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.use(authenticateToken);

// Obtener datos
router.get("/", getProductVariants);
router.get("/topSales", getTopProductVariants);
router.get("/outOfStock", getOutOfStockVariants);
// grouped endpoints deprecados. Existen por legacy
router.get("/grouped", getVariantsGroupedByNameStateAndMedida);
router.get("/topSales/grouped", getTopVariantsGroupedByNameStateAndMedida);
// Nuevos endpoints para variantes formateadas
router.get("/variantsVentasFrontend",getVariantsForVentasFrontend);
router.get("/topSales/VentasFrontend",getTopVariantsForVentasFrontend);
//
router.get("/product/:productId", getVariantsByProductId);
router.get("/state/:state", getVariantsByState);
router.get("/:id", getProductVariantById); // Al final

// Modificar datos
router.post("/", addProductVariant);
router.put("/:id", updateProductVariant);
router.delete("/:id", deleteProductVariant);

module.exports = router;