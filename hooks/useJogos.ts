export function useJogos() {

  const iniciarJogo = (nome: string) => {
    alert(`Iniciando ${nome}...`);
  };

  return {
    iniciarJogo
  };
}