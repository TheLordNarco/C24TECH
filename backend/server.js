require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());


// Importar rotas
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("API rodando...");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
