const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(401).json({ message: "Acesso negado! Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, "seuSegredoSuperSecreto"); // Use a mesma chave secreta do login
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Token inválido!" });
    }
};
