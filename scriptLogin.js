document.getElementById('cadastrarBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const email = document.getElementById('emailLogin').value.trim();
  const senha = document.getElementById('senhaLogin').value.trim();
  const msgLogin = document.getElementById('msgLogin');

  if (!email || !senha) {
    msgLogin.style.color = 'red';
    msgLogin.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuarioEncontrado = usuarios.find(
    user => user.email.toLowerCase() === email.toLowerCase() && user.senha === senha
  );

  if (usuarioEncontrado) {
    msgLogin.style.color = 'lightgreen';
    msgLogin.textContent = `Login realizado com sucesso! Bem-vindo, ${usuarioEncontrado.nome}.`;
    localStorage.setItem('usuarioLogado', usuarioEncontrado.email);

    
    setTimeout(() => {
      window.location.href = 'paginaPrincipal.html'; 
    }, 2000);
  } else {
    msgLogin.style.color = 'red';
    msgLogin.textContent = 'Email ou senha incorretos.';
  }
});