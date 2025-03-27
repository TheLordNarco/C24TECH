const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dadiva16@@", // Sua senha
    database: "loja"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("✅ Conexão bem-sucedida ao banco de dados!");
    }
    db.end();
});
