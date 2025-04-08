const express = require("express");
const { 
    getPreventas, 
    addPreventa, 
    updatePreventa ,
    deletePreventa
} = require("../controllers/ventasController");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getPreventas);
router.post("/", authenticateToken, addPreventa);
router.put("/:id", authenticateToken, deletePreventa);
router.delete("/:id", );

module.exports = router;