// js/estado.js
// O estado único da aplicação. Nada fora daqui guarda uma cópia
// paralela de busca/filtro/ordenação — quem quiser ler, chama
// obterEstado(); quem quiser mudar, chama atualizarEstado().

const estado = {
  tarefasOriginais: [], // vindas do dados.json — nunca filtradas/ordenadas aqui
  busca: '',
  filtroStatus: 'todos',
  filtroPrioridade: 'todas',
  ordenacao: 'prazo-asc', // 'prazo-asc' | 'prazo-desc'
  carregando: false,
  erro: null, // string com a mensagem pronta, ou null
};

// O próprio módulo de estado não sabe desenhar nada na tela — quem
// registra "o que fazer quando o estado mudar" é o main.js. Isso evita
// que estado.js precise importar estados.js (e vice-versa).
let aoAtualizar = () => {};

export function obterEstado() {
  return estado;
}

export function definirCallbackDeRenderizacao(callback) {
  aoAtualizar = callback;
}

export function atualizarEstado(mudancas) {
  Object.assign(estado, mudancas);
  aoAtualizar();
}
