const jwt = require("jsonwebtoken");
const SECRET_KEY = "mi_clave_secreta";

// Simulación de base de datos con usuarios y roles
const users = [
  { id: 1, username: "admin", password: "admin123", role: "admin", name: "Administrador" },
  { id: 2, username: "caja", password: "caja123", role: "cashier", name: "Cajero Principal" },
  { id: 3, username: "jefe", password: "jefe123", role: "sales_manager", name: "Jefe de Ventas" },
  { id: 4, username: "vendedor", password: "vend123", role: "salesperson", name: "Vendedor" }
];

// Lógica para login mejorada
const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    // Generamos el token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        role: user.role 
      }, 
      SECRET_KEY, 
      { expiresIn: "1h" }
    );
    
    // Configuramos la cookie con el token JWT
    res.cookie('auth_token', token, {
      httpOnly: true,       // No accesible por JavaScript del cliente
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'strict',   // Protección CSRF
      maxAge: 3600000       // 1 hora en milisegundos
    });
    
    // Respondemos con información del usuario (sin incluir la contraseña)
    res.json({ 
      user: {
        username: user.username,
        role: user.role,
        name: user.name
      } 
    });
    
    console.log(`Usuario ${user.username} (${user.role}) autenticado correctamente`);
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
    console.log("Intento de acceso con credenciales inválidas");
  }
};

// Nueva función para verificar autenticación
const verifyAuth = (req, res) => {
  try {
    // Obtenemos el token desde la cookie
    const token = req.cookies.auth_token;
    
    if (!token) {
      return res.status(401).json({ 
        authenticated: false, 
        message: "No se encontró token de autenticación" 
      });
    }
    
    // Verificamos el token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Buscamos el usuario para devolver info actualizada
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        authenticated: false, 
        message: "Usuario no encontrado" 
      });
    }
    
    // Respondemos que está autenticado junto con los datos básicos del usuario
    return res.json({
      authenticated: true,
      user: {
        username: user.username,
        role: user.role,
        name: user.name
      }
    });
    
  } catch (error) {
    // Si hay un error verificando el token (expirado, inválido, etc.)
    console.log("Error en verificación de token:", error.message);
    return res.status(401).json({ 
      authenticated: false, 
      message: "Token inválido o expirado" 
    });
  }
};

// Nueva función para cerrar sesión
const logout = (req, res) => {
  // Eliminar la cookie de autenticación
  res.clearCookie('auth_token');
  res.json({ success: true, message: "Sesión cerrada correctamente" });
};

module.exports = { login, verifyAuth, logout };