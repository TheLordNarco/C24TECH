// frontend/assets/js/edit-profile.js
const editProfileForm = document.getElementById('edit-profile-form');

editProfileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;
  const phone = document.getElementById('user-phone').value;

  try {
    const response = await fetch('/api/users/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, email, phone })
    });

    if (response.ok) {
      alert('Perfil atualizado com sucesso!');
    } else {
      alert('Erro ao atualizar perfil');
    }
  } catch (error) {
    console.error('Erro ao editar perfil:', error);
    alert('Erro ao editar perfil');
  }
});
