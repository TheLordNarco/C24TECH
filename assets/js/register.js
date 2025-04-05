document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const fullname = document.getElementById("fullname").value.trim();
      const username = document.getElementById("username").value.trim();
      const address = document.getElementById("address").value.trim();
      const birthdate = document.getElementById("birthdate").value;
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      // Verificar se todos os campos estão preenchidos
      if (!fullname || !username || !address || !birthdate || !phone || !email || !password || !confirmPassword) {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      // Validação de idade mínima (16 anos)
      const userBirthDate = new Date(birthdate);
      const today = new Date();
      const age = today.getFullYear() - userBirthDate.getFullYear();
      const ageMonth = today.getMonth() - userBirthDate.getMonth();
      const isOldEnough = age > 16 || (age === 16 && ageMonth >= 0);
  
      if (!isOldEnough) {
        alert("Você precisa ter no mínimo 16 anos para se cadastrar.");
        return;
      }
  
      // Validação de senha segura
      const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (!strongPasswordRegex.test(password)) {
        alert("A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, um número e um símbolo.");
        return;
      }
  
      // Verificar se as senhas coincidem
      if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }
  
      // Se passou em todas as validações, enviar os dados (ex: para o backend futuramente)
      console.log("Cadastro válido! Pronto para enviar ao servidor.");
      alert("Cadastro válido! Agora você será redirecionado para a verificação de e-mail.");
  
      // Redirecionar para próxima etapa (exemplo)
      window.location.href = "verify-email.html"; // futura página de verificação
    });
  });
  