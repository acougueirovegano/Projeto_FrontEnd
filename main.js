// js/main.js
// Ponto de entrada. Não há await de nível superior: tudo roda dentro
// de iniciar(), chamada uma vez quando o módulo carrega.

import { carregarTarefas } from './api.js';
import { renderizarEstado } from './estados.js';

function mensagemDeErro(erro) {
  if (erro.name === 'TypeError') {
    // fetch rejeitou antes de qualquer resposta chegar: sem rede,
    // DNS, CORS, servidor fora do ar, etc.
    return 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.';
  }

  if (erro.name === 'SyntaxError') {
    // resposta.json() não conseguiu interpretar o corpo como JSON.
    return 'Os dados recebidos estão em um formato inválido. Avise quem mantém o arquivo dados.json.';
  }

  // Resposta chegou, mas response.ok era falso (404, 500, etc.).
  return erro.message || 'Não foi possível carregar as tarefas.';
}

async function iniciar() {
  renderizarEstado('carregando');

  try {
    const tarefas = await carregarTarefas();

    if (tarefas.length === 0) {
      renderizarEstado('vazio');
      return;
    }

    renderizarEstado('sucesso', tarefas);
  } catch (erro) {
    renderizarEstado('erro', mensagemDeErro(erro));
  }
}

iniciar();
