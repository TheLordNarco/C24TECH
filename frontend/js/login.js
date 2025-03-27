document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login realizado com sucesso!");
            localStorage.setItem("token", data.token); // Armazena o token JWT no navegador
            window.location.href = "dashboard.html"; // Redireciona para o painel
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao conectar com o servidor.");
    }
});
