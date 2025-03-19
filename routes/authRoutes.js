const express = require("express");
const { login, verifyAuth, logout } = require("../controllers/authController");

const router = express.Router();

// Ruta para login (para obtener el token)
router.post("/login", login);

// Ruta para verificar autenticación
router.get("/verify", verifyAuth);

// Ruta para cerrar sesión
router.post("/logout", logout);

module.exports = router;