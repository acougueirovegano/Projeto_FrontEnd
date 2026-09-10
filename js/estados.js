// js/estados.js
// Responsável só por decidir qual das cinco telas está valendo:
// carregando, sucesso, vazio, sem-resultado ou erro. Nenhuma
// requisição acontece aqui — os dados (ou o erro) já chegam prontos
// de js/main.js, que é quem decide qual destes chamar.

import { renderizarTarefas } from './renderizacao.js';

const MENSAGEM_CARREGANDO = 'Carregando tarefas…';
const MENSAGEM_VAZIO = 'Nenhuma tarefa cadastrada no momento.';
const MENSAGEM_SEM_RESULTADO =
  'Nenhuma tarefa encontrada para os filtros aplicados.';

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
 * Decide qual das cinco telas mostrar e anuncia a mudança para
 * leitores de tela através da região de status.
 *
 * @param {'carregando'|'sucesso'|'vazio'|'sem-resultado'|'erro'} estado
 * @param {Array|string} [dados] - array de tarefas VISÍVEIS (sucesso,
 *   já filtradas/ordenadas por js/derivacao.js) ou mensagem de erro
 *   já pronta para exibição (erro)
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

    case 'sem-resultado': {
      mostrarMensagem(MENSAGEM_SEM_RESULTADO, 'sem-resultado');
      anunciar(MENSAGEM_SEM_RESULTADO);
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
        total === 1 ? '1 tarefa encontrada.' : `${total} tarefas encontradas.`;
      anunciar(texto);
      break;
    }

    default:
      throw new Error(`Estado desconhecido: ${estado}`);
  }
}
