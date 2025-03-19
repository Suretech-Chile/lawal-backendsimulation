const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

// Importamos las rutas
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middlewares
app.use(bodyParser.json()); // Para parsear las solicitudes JSON
app.use(cookieParser()); // Para parsear cookies
app.use(cors()); // Habilitar CORS

// Rutas
app.use("/api/auth", authRoutes); // Ruta de autenticación (login)
app.use("/api/products", productRoutes); // Ruta de productos (protegida)

// Iniciamos el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
