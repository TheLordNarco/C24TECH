const db = require("./db");
const bcrypt = require("bcrypt");

const email = "admin@email.com";
const senha = "admin123"; // Senha padrão
const senhaCriptografada = bcrypt.hashSync(senha, 10);

db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
  if (err) {
    console.error("Erro ao verificar usuário:", err);
    return;
  }

  if (results.length > 0) {
    console.log("Usuário já existe. Pulando inserção.");
  } else {
    db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      ["Administrador", email, senhaCriptografada],
      (err, result) => {
        if (err) {
          console.error("Erro ao inserir usuário:", err);
          return;
        }
        console.log("Usuário inserido com sucesso!");
      }
    );
  }
});
