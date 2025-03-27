const express = require("express");
const router = express.Router();
const db = require("../db");

// Listar produtos
router.get("/", (req, res) => {
    db.query("SELECT * FROM produtos", (err, results) => {
        if (err) return res.status(500).json({ message: "Erro ao buscar produtos" });
        res.json(results);
    });
});

// Adicionar produto
router.post("/add", (req, res) => {
    const { nome, preco, descricao } = req.body;
    const sql = "INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)";

    db.query(sql, [nome, preco, descricao], (err) => {
        if (err) return res.status(500).json({ message: "Erro ao adicionar produto" });
        res.json({ message: "Produto adicionado!" });
    });
});

module.exports = router;
