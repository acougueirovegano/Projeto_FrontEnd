// js/api.js
// Responsável só por buscar e validar os dados. Nunca toca no DOM.
// Quem decide o que a tela mostra é o js/estados.js, chamado a partir
// do js/main.js.

/**
 * Busca as tarefas em dados.json (mesma origem da página).
 *
 * Lança:
 *  - TypeError  -> quando o fetch em si falha (sem rede, DNS, CORS, etc.)
 *  - Error      -> quando a resposta chega mas o status HTTP não é OK
 *                  (ex.: 404, 500) — carrega o status em `erro.status`
 *  - SyntaxError-> quando o corpo da resposta não é um JSON válido
 *
 * @returns {Promise<Array>} o array de tarefas (dados.tarefas)
 */
export async function carregarTarefas() {
  const resposta = await fetch('dados.json');

  if (!resposta.ok) {
    const erro = new Error(
      `Não foi possível carregar as tarefas (HTTP ${resposta.status}).`
    );
    erro.status = resposta.status;
    throw erro;
  }

  const corpo = await resposta.json();
  return corpo.tarefas;
}
