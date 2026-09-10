// js/controles.js
// Liga os controles do HTML ao estado central. Cada evento só chama
// atualizarEstado() — quem decide o que aparece na tela depois disso
// é sempre o mesmo ciclo de renderização em main.js, nunca este
// arquivo.

import { atualizarEstado } from './estado.js';

export function iniciarControles() {
  const campoBusca = document.getElementById('busca-titulo');
  campoBusca.addEventListener('input', (evento) => {
    atualizarEstado({ busca: evento.target.value });
  });

  document.querySelectorAll('input[name="status"]').forEach((radio) => {
    radio.addEventListener('change', (evento) => {
      atualizarEstado({ filtroStatus: evento.target.value });
    });
  });

  document.querySelectorAll('input[name="prioridade"]').forEach((radio) => {
    radio.addEventListener('change', (evento) => {
      atualizarEstado({ filtroPrioridade: evento.target.value });
    });
  });

  const seletorOrdenacao = document.getElementById('ordenacao');
  seletorOrdenacao.addEventListener('change', (evento) => {
    atualizarEstado({ ordenacao: evento.target.value });
  });

  document.getElementById('limpar-filtros').addEventListener('click', () => {
    campoBusca.value = '';
    document.getElementById('status-todos').checked = true;
    document.getElementById('prioridade-todas').checked = true;
    seletorOrdenacao.value = 'prazo-asc';

    atualizarEstado({
      busca: '',
      filtroStatus: 'todos',
      filtroPrioridade: 'todas',
      ordenacao: 'prazo-asc',
    });
  });

  // não há mais botão de submit, mas se alguém der Enter dentro do
  // campo de busca o form não deve tentar recarregar a página
  document
    .querySelector('main > section:first-of-type form')
    .addEventListener('submit', (evento) => evento.preventDefault());
}
