// Middleware encargado de autenticar el token para las rutas que lo necesiten

const jwt = require("jsonwebtoken");
const SECRET_KEY = "mi_clave_secreta";

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extraemos el token del header Authorization
  if (!token) {
    return res.status(401).json({ message: "No autorizado. Token faltante" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verificamos el token
    req.user = decoded; // Adjuntamos la info del usuario al request para usarla en los controladores
    next(); // Pasamos al siguiente middleware o controlador
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = authenticateToken;
