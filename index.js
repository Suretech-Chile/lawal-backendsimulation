const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Clave secreta para firmar los tokens
const SECRET_KEY = "mi_clave_secreta";

// Simular una base de datos de usuarios
const users = [
  { id: 1, username: "admin", password: "password" },
];

// Ruta para iniciar sesión y generar un token
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password); // Acá se simula buscar en a base de datos, buscando en users

  if (user) {
    // Generar el token con información del usuario
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
});

// Ruta protegida
app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: "Acceso concedido", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
});

app.listen(5000, () => console.log("Backend corriendo en http://localhost:5000"));
