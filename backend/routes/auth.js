const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Rota de Registro
router.post("/register", async (req, res) => {
    const { nome, email, telefone, data_nascimento, senha } = req.body;

    if (!nome || !email || !telefone || !data_nascimento || !senha) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const sql = "INSERT INTO usuarios (nome, email, telefone, data_nascimento, senha) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nome, email, telefone, data_nascimento, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ message: "Erro ao registrar usuário" });
        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    });
});

// Rota de Login
router.post("/login", (req, res) => {
    const { email, senha } = req.body;
    db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: "Usuário não encontrado" });

        const user = results[0];
        const senhaCorreta = await bcrypt.compare(senha, user.senha);

        if (!senhaCorreta) return res.status(401).json({ message: "Senha incorreta" });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    });
});

module.exports = router;
