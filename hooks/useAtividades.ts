export function useAtividades() {

  const abrirAtividade = (nome: string) => {
    alert(`Abrindo ${nome}...`);
  };

  return {
    abrirAtividade
  };
}