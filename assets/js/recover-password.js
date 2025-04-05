document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resetForm");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const identifier = document.getElementById("identifier").value.trim();
  
      if (!identifier) {
        alert("Por favor, insira seu e-mail, telefone ou nome de usuário.");
        return;
      }
  
      try {
        // Simulação do envio para o backend
        console.log("Enviando solicitação de recuperação para:", identifier);
  
        // Futuro: fetch('/api/auth/forgot-password', { ... })
  
        alert("Se os dados estiverem corretos, enviaremos um link de redefinição para você por e-mail.");
      } catch (err) {
        console.error("Erro ao tentar recuperar senha:", err);
        alert("Erro ao tentar recuperar a senha. Tente novamente mais tarde.");
      }
    });
  });
  