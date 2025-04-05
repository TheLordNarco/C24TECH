document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const identifier = document.getElementById("identifier").value.trim();
      const password = document.getElementById("password").value;
  
      // Verifica se os campos estão preenchidos
      if (!identifier || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      // Simulação de envio ao backend
      const loginData = {
        identifier, // pode ser email, telefone ou username
        password,
      };
  
      try {
        // Aqui você faria a chamada real ao backend
        // const response = await fetch('/api/auth/login', { ... })
  
        console.log("Enviando dados de login:", loginData);
  
        // Simulação de resposta (remover isso quando tiver backend)
        const fakeResponse = {
          success: true,
          verified: true, // Troque para false para simular e-mail não verificado
          role: "cliente", // ou funcionario, administrador
          token: "fake-jwt-token"
        };
  
        if (!fakeResponse.verified) {
          alert("Seu e-mail ainda não foi verificado. Por favor, verifique seu e-mail antes de fazer login.");
          return;
        }
  
        if (fakeResponse.success) {
          alert("Login realizado com sucesso!");
  
          // Salvar token (quando tiver backend real)
          localStorage.setItem("authToken", fakeResponse.token);
  
          // Redirecionar com base no tipo de usuário
          switch (fakeResponse.role) {
            case "cliente":
              window.location.href = "dashboard.html";
              break;
            case "funcionario":
              window.location.href = "employer.html";
              break;
            case "administrador":
              window.location.href = "admin.html";
              break;
            default:
              alert("Perfil de usuário não reconhecido.");
          }
        } else {
          alert("Usuário ou senha inválidos.");
        }
  
      } catch (err) {
        console.error("Erro durante o login:", err);
        alert("Ocorreu um erro ao tentar fazer login. Tente novamente.");
      }
    });
  });
  