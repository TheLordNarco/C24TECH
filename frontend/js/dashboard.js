document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem("userName");
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html"; // Redireciona para o login
        return;
    }

    document.getElementById("userName").textContent = userName;

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        window.location.href = "login.html"; // Redireciona para o login
    });
});
