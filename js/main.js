// js/main.js
// Ponto de entrada. Não há await de nível superior: tudo roda dentro
// de iniciar(), chamada uma vez quando o módulo carrega.
//
// Este arquivo é o ÚNICO lugar que decide qual das telas vale, a
// partir do estado central. Toda mudança (busca, filtro, ordenação,
// resposta do fetch) passa por atualizarEstado(), que chama de volta
// renderizar() aqui embaixo.

import { carregarTarefas } from './api.js';
import { renderizarEstado } from './estados.js';
import {
  obterEstado,
  atualizarEstado,
  definirCallbackDeRenderizacao,
} from './estado.js';
import { obterTarefasVisiveis } from './derivacao.js';
import { iniciarControles } from './controles.js';

function mensagemDeErro(erro) {
  if (erro.name === 'TypeError') {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
  }
  if (erro.name === 'SyntaxError') {
    return 'Os dados recebidos estão em um formato inválido. Avise quem mantém o arquivo dados.json.';
  }
  return erro.message || 'Não foi possível carregar as tarefas.';
}

// O único ponto de renderização. Cartões, contagem e mensagens saem
// todos daqui, sempre a partir do estado atual — nunca de um evento
// tratando a tela na mão.
function renderizar() {
  const estado = obterEstado();

  if (estado.carregando) {
    renderizarEstado('carregando');
    return;
  }

  if (estado.erro) {
    renderizarEstado('erro', estado.erro);
    return;
  }

  if (estado.tarefasOriginais.length === 0) {
    renderizarEstado('vazio');
    return;
  }

  const visiveis = obterTarefasVisiveis(estado);

  if (visiveis.length === 0) {
    renderizarEstado('sem-resultado');
    return;
  }

  renderizarEstado('sucesso', visiveis);
}

async function iniciar() {
  definirCallbackDeRenderizacao(renderizar);
  iniciarControles();

  atualizarEstado({ carregando: true });

  try {
    const tarefas = await carregarTarefas();
    atualizarEstado({ tarefasOriginais: tarefas, carregando: false });
  } catch (erro) {
    atualizarEstado({ erro: mensagemDeErro(erro), carregando: false });
  }
}

iniciar();
