const jwt = require("jsonwebtoken");
const SECRET_KEY = "mi_clave_secreta";
const users = [{ id: 1, username: "admin", password: "password" }]; // Simulamos una base de datos

// Lógica para login
const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token }); // Enviamos el token al cliente
    console.log("Token enviado")
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
    console.log("Credenciales inválidas")
  }
};

module.exports = { login };
