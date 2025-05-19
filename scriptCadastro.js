document.getElementById('cadastrarBtn').addEventListener('click', function(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const sobrenome = document.getElementById('sobrenome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const msg = document.getElementById('msg');

  if (!nome || !sobrenome || !email || !senha) {
    msg.style.color = 'red';
    msg.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const emailExiste = usuarios.some(user => user.email.toLowerCase() === email.toLowerCase());

  if (emailExiste) {
    msg.style.color = 'red';
    msg.textContent = 'Este email já está cadastrado.';
    return;
  }

  const novoUsuario = { nome, sobrenome, email, senha };
  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  msg.style.color = 'lightgreen';
  msg.textContent = `Cadastro realizado com sucesso! Redirecionando para login...`;

  
  document.getElementById('nome').value = '';
  document.getElementById('sobrenome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('senha').value = '';

  
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
});