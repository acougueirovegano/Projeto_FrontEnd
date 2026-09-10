// js/renderizacao.js
// Responsável só por desenhar tarefas que já existem em memória.
// Nenhuma requisição de rede acontece aqui — quem traz os dados é o
// js/api.js. Esta função não deve ser alterada depois desta entrega.

const SECAO_POR_STATUS = {
  'a-fazer': 'status-a-fazer',
  'em-andamento': 'status-em-andamento-heading',
  'em-revisao': 'status-em-revisao-heading',
  'concluida': 'status-concluida-heading',
};

const ROTULO_PRIORIDADE = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
};

function formatarPrazo(prazoIso) {
  const [ano, mes, dia] = prazoIso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function criarParDefinicao(rotulo, textoVisivel) {
  const dt = document.createElement('dt');
  dt.textContent = rotulo;

  const dd = document.createElement('dd');
  dd.textContent = textoVisivel;

  return [dt, dd];
}

function criarCartaoTarefa(tarefa) {
  const li = document.createElement('li');
  const artigo = document.createElement('article');

  const idTitulo = `task-${tarefa.id}-title`;
  artigo.setAttribute('aria-labelledby', idTitulo);

  const titulo = document.createElement('h4');
  titulo.id = idTitulo;
  titulo.textContent = tarefa.titulo;

  const dl = document.createElement('dl');

  const [dtProjeto, ddProjeto] = criarParDefinicao('Projeto', tarefa.projeto);
  const [dtResponsavel, ddResponsavel] = criarParDefinicao(
    'Responsável',
    tarefa.responsavel
  );

  const dtPrazo = document.createElement('dt');
  dtPrazo.textContent = 'Prazo';
  const ddPrazo = document.createElement('dd');
  const time = document.createElement('time');
  time.setAttribute('datetime', tarefa.prazo);
  time.textContent = formatarPrazo(tarefa.prazo);
  ddPrazo.appendChild(time);

  const dtPrioridade = document.createElement('dt');
  dtPrioridade.textContent = 'Prioridade';
  const ddPrioridade = document.createElement('dd');
  ddPrioridade.dataset.prioridade = tarefa.prioridade;
  ddPrioridade.textContent =
    ROTULO_PRIORIDADE[tarefa.prioridade] ?? tarefa.prioridade;

  dl.append(
    dtProjeto,
    ddProjeto,
    dtResponsavel,
    ddResponsavel,
    dtPrazo,
    ddPrazo,
    dtPrioridade,
    ddPrioridade
  );

  artigo.append(titulo, dl);
  li.appendChild(artigo);
  return li;
}

/**
 * Desenha as tarefas nas colunas do quadro, uma coluna por status.
 * Recebe o array já pronto — não busca nada, não decide estado.
 *
 * @param {Array} tarefas
 */
export function renderizarTarefas(tarefas) {
  const listas = document.querySelectorAll('#quadro-colunas ul');
  listas.forEach((ul) => {
    ul.textContent = '';
  });

  tarefas.forEach((tarefa) => {
    const idSecao = SECAO_POR_STATUS[tarefa.status];
    if (!idSecao) return;

    const lista = document.querySelector(
      `section[aria-labelledby="${idSecao}"] > ul`
    );
    if (!lista) return;

    lista.appendChild(criarCartaoTarefa(tarefa));
  });
}
