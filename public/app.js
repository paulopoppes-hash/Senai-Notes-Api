const API_URL = 'http://localhost:3000/api/notes';

const form = document.getElementById('formNota');
const tituloInput = document.getElementById('titulo');
const textoInput = document.getElementById('texto');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');
const lista = document.getElementById('listaNotas');

let editandoId = null;

async function carregarNotas() {
  try {
    const resposta = await fetch(API_URL);
    const notas = await resposta.json();
    renderizarNotas(notas);
  } catch (erro) {
    console.error('Erro ao carregar notas:', erro);
    lista.innerHTML = '<p class="vazio">Erro ao carregar notas.</p>';
  }
}

function renderizarNotas(notas) {
  if (!notas.length) {
    lista.innerHTML = '<p class="vazio">Nenhuma nota cadastrada.</p>';
    return;
  }

  lista.innerHTML = '';
  notas.forEach(nota => {
    const div = document.createElement('div');
    div.className = 'nota';
    div.innerHTML = `
      <h3>${escapeHtml(nota.titulo)}</h3>
      <p>${escapeHtml(nota.texto)}</p>
      ${nota.criadoEm ? `<small style="color:#888;">${new Date(nota.criadoEm).toLocaleString('pt-BR')}</small>` : ''}
      <div class="acoes">
        <button class="editar" data-id="${nota.id}">Editar</button>
        <button class="excluir" data-id="${nota.id}">Excluir</button>
      </div>
    `;
    lista.appendChild(div);
  });

  document.querySelectorAll('.editar').forEach(botao => {
    botao.addEventListener('click', () => editarNota(botao.dataset.id));
  });

  document.querySelectorAll('.excluir').forEach(botao => {
    botao.addEventListener('click', () => excluirNota(botao.dataset.id));
  });
}

function escapeHtml(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = tituloInput.value.trim();
  const texto = textoInput.value.trim();

  if (!titulo || !texto) return;

  if (editandoId) {
    await fetch(`${API_URL}/${editandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, texto })
    });
    editandoId = null;
    btnSalvar.textContent = 'Salvar Nota';
    btnCancelar.style.display = 'none';
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, texto })
    });
  }

  form.reset();
  carregarNotas();
});

btnCancelar.addEventListener('click', () => {
  editandoId = null;
  form.reset();
  btnSalvar.textContent = 'Salvar Nota';
  btnCancelar.style.display = 'none';
});

async function editarNota(id) {
  try {
    const resposta = await fetch(API_URL);
    const notas = await resposta.json();
    const nota = notas.find(n => n.id === id);
    if (!nota) return;

    tituloInput.value = nota.titulo;
    textoInput.value = nota.texto;
    editandoId = nota.id;
    btnSalvar.textContent = 'Atualizar Nota';
    btnCancelar.style.display = 'inline-block';
    tituloInput.focus();
  } catch (erro) {
    console.error('Erro ao carregar nota para edição:', erro);
  }
}

async function excluirNota(id) {
  if (!confirm('Deseja realmente excluir esta nota?')) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    carregarNotas();
  } catch (erro) {
    console.error('Erro ao excluir nota:', erro);
  }
}

carregarNotas();
