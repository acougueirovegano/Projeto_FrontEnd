// js/estados.js
// Responsável só por decidir qual das quatro telas está valendo:
// carregando, sucesso, vazio ou erro. Nenhuma requisição acontece
// aqui — os dados (ou o erro) já chegam prontos de js/main.js.

import { renderizarTarefas } from './renderizacao.js';

const MENSAGEM_CARREGANDO = 'Carregando tarefas…';
const MENSAGEM_VAZIO = 'Nenhuma tarefa cadastrada no momento.';

function elementos() {
  return {
    regiaoStatus: document.getElementById('status-regiao'),
    mensagemEstado: document.getElementById('mensagem-estado'),
    quadroColunas: document.getElementById('quadro-colunas'),
  };
}

function mostrarMensagem(texto, tipo) {
  const { mensagemEstado, quadroColunas } = elementos();
  quadroColunas.hidden = true;
  mensagemEstado.hidden = false;
  mensagemEstado.dataset.tipo = tipo;
  mensagemEstado.textContent = texto;
}

function mostrarQuadro() {
  const { mensagemEstado, quadroColunas } = elementos();
  mensagemEstado.hidden = true;
  mensagemEstado.textContent = '';
  delete mensagemEstado.dataset.tipo;
  quadroColunas.hidden = false;
}

function anunciar(texto) {
  elementos().regiaoStatus.textContent = texto;
}

/**
 * Decide qual das quatro telas mostrar e anuncia a mudança para
 * leitores de tela através da região de status.
 *
 * @param {'carregando'|'sucesso'|'vazio'|'erro'} estado
 * @param {Array|string} [dados] - array de tarefas (sucesso) ou
 *   mensagem de erro já pronta para exibição (erro)
 */
export function renderizarEstado(estado, dados) {
  switch (estado) {
    case 'carregando': {
      mostrarMensagem(MENSAGEM_CARREGANDO, 'carregando');
      anunciar(MENSAGEM_CARREGANDO);
      break;
    }

    case 'vazio': {
      mostrarMensagem(MENSAGEM_VAZIO, 'vazio');
      anunciar(MENSAGEM_VAZIO);
      break;
    }

    case 'erro': {
      mostrarMensagem(dados, 'erro');
      anunciar(dados);
      break;
    }

    case 'sucesso': {
      mostrarQuadro();
      renderizarTarefas(dados);
      const total = dados.length;
      const texto =
        total === 1 ? '1 tarefa carregada.' : `${total} tarefas carregadas.`;
      anunciar(texto);
      break;
    }

    default:
      throw new Error(`Estado desconhecido: ${estado}`);
  }
}
