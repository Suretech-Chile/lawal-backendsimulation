const express = require("express");
const { login } = require("../controllers/authController");

const router = express.Router();

// Ruta para login (para obtener el token)
router.post("/login", login);

module.exports = router;
