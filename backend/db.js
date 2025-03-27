const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Dadiva16@@",
    database: process.env.DB_NAME || "loja",
});

db.getConnection()
    .then(() => console.log("✅ Conectado ao banco de dados!"))
    .catch((err) => console.error("❌ Erro ao conectar ao banco de dados:", err));

module.exports = db;
