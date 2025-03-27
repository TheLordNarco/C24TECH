const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();

// Rota de registro corrigida
router.post("/register", async (req, res) => {
    try {
        const { name, email, phone, dob, password } = req.body;

        // Verifica se o e-mail já existe
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "E-mail já cadastrado!" });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o usuário no banco
        await db.query(
            "INSERT INTO users (name, email, phone, dob, password) VALUES (?, ?, ?, ?, ?)",
            [name, email, phone, dob, hashedPassword]
        );

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ message: "Erro no servidor." });
    }
});

module.exports = router;
