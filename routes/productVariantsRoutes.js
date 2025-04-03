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

router.get("/", authenticateToken, getProductVariants);
router.get("/:id", authenticateToken, getProductVariantById);
router.get("/product/:productId", authenticateToken, getVariantsByProductId);
router.get("/state/:state", authenticateToken, getVariantsByState);
router.get("/outOfStock", authenticateToken, getOutOfStockVariants);
router.post("/", authenticateToken, addProductVariant);
router.put("/:id", authenticateToken, updateProductVariant);
router.delete("/:id", authenticateToken, deleteProductVariant);

router.get("/topSales", authenticateToken, getTopProductVariants);

router.get("/grouped", authenticateToken, getVariantsGroupedByNameStateAndMedida);
router.get("/topSales/grouped", authenticateToken, getTopVariantsGroupedByNameStateAndMedida);


module.exports = router;