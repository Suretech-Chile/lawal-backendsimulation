// Middleware encargado de autenticar el token para las rutas que lo necesiten

const jwt = require("jsonwebtoken");
const SECRET_KEY = "mi_clave_secreta";

const authenticateToken = (req, res, next) => {
  // Aquí obtenemos el token desde las cookies, usando cookie-parser
  const token = req.cookies.auth_token;  // "auth_token" es el nombre de la cookie en la que se guarda el JWT (ver authController.js)
  
  if (!token) {
    console.log("Intento de acceso no autorizado. Token faltante");
    return res.status(401).json({ message: "No autorizado. Token faltante" });
    
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verificamos el token
    req.user = decoded; // Adjuntamos la info del usuario al request para usarla en los controladores
    next(); // Pasamos al siguiente middleware o controlador
  } catch (err) {
    console.log("Error en la decodificación del token. Inválido o expirado.");
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = authenticateToken;
