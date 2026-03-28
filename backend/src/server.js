require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3001;

// Conectar a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
