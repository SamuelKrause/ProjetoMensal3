const emailUsuarioLogado = localStorage.getItem('usuarioLogado');

if (!emailUsuarioLogado) {
  alert('Você precisa estar logado para acessar esta página.');
  window.location.href = 'login.html';
}

const chaveQuadros = `quadros_${emailUsuarioLogado}`;
const quadroContainer = document.getElementById('quadroContainer');
const botaoAdd = document.getElementById('botaoAdd');

let quadros = JSON.parse(localStorage.getItem(chaveQuadros)) || [];

function salvarQuadros() {
  localStorage.setItem(chaveQuadros, JSON.stringify(quadros));
}

function criarQuadroDOM(quadro, index) {
  const div = document.createElement('div');
  div.className = 'quadro';

  const titulo = document.createElement('div');
  titulo.className = 'quadroTitulo';
  titulo.contentEditable = true;
  titulo.textContent = quadro.titulo || 'Novo Quadro';
  titulo.addEventListener('input', e => {
    quadros[index].titulo = e.target.textContent.trim();
    salvarQuadros();
  });

  div.appendChild(titulo);

  quadro.tarefas = quadro.tarefas || [];

  quadro.tarefas.forEach((tarefa, i) => {
    const tarefaDiv = criarTarefaDOM(tarefa, index, i);
    div.appendChild(tarefaDiv);
  });

  const btnAddTarefa = document.createElement('button');
  btnAddTarefa.className = 'adicionarTarefa';
  btnAddTarefa.textContent = '+ Adicionar tarefa';
  btnAddTarefa.addEventListener('click', () => {
    quadro.tarefas.push('Nova tarefa');
    salvarQuadros();
    renderizarQuadros();
  });

  div.appendChild(btnAddTarefa);

  const btnRemoverQuadro = document.createElement('button');
  btnRemoverQuadro.className = 'tarefaBtn';
  btnRemoverQuadro.style.marginTop = '10px';
  btnRemoverQuadro.textContent = 'Excluir Quadro';
  btnRemoverQuadro.addEventListener('click', () => {
    if (confirm('Excluir este quadro?')) {
      quadros.splice(index, 1);
      salvarQuadros();
      renderizarQuadros();
    }
  });

  div.appendChild(btnRemoverQuadro);

  return div;
}

function criarTarefaDOM(tarefa, quadroIndex, tarefaIndex) {
  const tarefaContainer = document.createElement('div');
  tarefaContainer.className = 'tarefaContainer';

  const div = document.createElement('div');
  div.className = 'quadroConteudo';
  div.contentEditable = true;
  div.textContent = tarefa;
  div.addEventListener('input', e => {
    quadros[quadroIndex].tarefas[tarefaIndex] = e.target.textContent.trim();
    salvarQuadros();
  });

  const actions = document.createElement('div');
  actions.className = 'tarefaActions';

  const btnRemover = document.createElement('button');
  btnRemover.className = 'tarefaBtn';
  btnRemover.textContent = 'Excluir';
  btnRemover.addEventListener('click', () => {
    if (confirm('Excluir esta tarefa?')) {
      quadros[quadroIndex].tarefas.splice(tarefaIndex, 1);
      salvarQuadros();
      renderizarQuadros();
    }
  });

  actions.appendChild(btnRemover);

  tarefaContainer.appendChild(div);     
  tarefaContainer.appendChild(actions); 

  return tarefaContainer;
}


function renderizarQuadros() {
  quadroContainer.innerHTML = '';
  quadros.forEach((quadro, i) => {
    quadroContainer.appendChild(criarQuadroDOM(quadro, i));
  });
  quadroContainer.appendChild(botaoAdd);
}

botaoAdd.addEventListener('click', () => {
  quadros.push({ titulo: 'Novo Quadro', tarefas: [] });
  salvarQuadros();
  renderizarQuadros();
});

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
  });
}




renderizarQuadros();

