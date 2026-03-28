const express = require("express");
const cors = require("cors");

const housesRoutes = require("./routes/houses.routes");
const uploadRoutes = require("./routes/upload.routes");
const authRoutes = require("./routes/auth.routes");  // ← NUEVA LÍNEA

const app = express();

app.use(cors());
app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.send("API Casas Prefabricadas funcionando");
});

// Rutas de casas
app.use("/api/houses", housesRoutes);

// Rutas de upload
app.use("/api/upload", uploadRoutes);

// Rutas de autenticación
app.use("/api/auth", authRoutes);  // ← NUEVA LÍNEA

module.exports = app;