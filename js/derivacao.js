// js/derivacao.js
// Função pura. Recebe o estado inteiro, devolve a lista que deve
// aparecer na tela. Nunca modifica estado.tarefasOriginais, nunca
// toca no DOM — só calcula e devolve um array novo.

// tira acentos e caixa, pra "andamento" achar "Andamento" e "revisão"
// achar "revisao" também
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function obterTarefasVisiveis(estado) {
  const termo = normalizar(estado.busca.trim());

  const filtradas = estado.tarefasOriginais.filter((tarefa) => {
    const bateBusca = termo === '' || normalizar(tarefa.titulo).includes(termo);
    const bateStatus =
      estado.filtroStatus === 'todos' || tarefa.status === estado.filtroStatus;
    const batePrioridade =
      estado.filtroPrioridade === 'todas' ||
      tarefa.prioridade === estado.filtroPrioridade;
    return bateBusca && bateStatus && batePrioridade;
  });

  // .sort() ordena "no lugar" — por isso a cópia com [...] antes.
  // O array de dentro de filtradas já é novo (veio do .filter), mas
  // copiar de novo aqui deixa a regra "nunca ordene sem copiar" válida
  // mesmo se alguém trocar o .filter por outra coisa no futuro.
  const ordenadas = [...filtradas].sort((a, b) => {
    const diferenca = new Date(a.prazo) - new Date(b.prazo);
    return estado.ordenacao === 'prazo-desc' ? -diferenca : diferenca;
  });

  return ordenadas;
}
