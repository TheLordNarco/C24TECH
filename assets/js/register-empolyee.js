// frontend/assets/js/register-employee.js
document.getElementById('register-employee-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
  
    // Validar se as senhas são iguais
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
  
    const employeeData = {
      name,
      email,
      phone,
      role,
      password
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(employeeData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Funcionário cadastrado com sucesso');
        window.location.href = '/admin-dashboard.html'; // Redirecionar para o painel do admin
      } else {
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      console.error('Erro de rede', error);
      alert('Erro ao cadastrar funcionário');
    }
  });
  