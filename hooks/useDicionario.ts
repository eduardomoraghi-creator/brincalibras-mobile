import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { getDictionaryItems } from "../src/data/librasHelpers";

export function useDicionario() {
  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const palavras = useMemo(() => getDictionaryItems(), []);

  const dadosFiltrados = palavras.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase().trim()),
  );

  const toggleFavorito = (id: string) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  const baseBusca = palavras.map((p) => ({
    id: p.id,
    palavra: p.palavra,
    rota: "/global/dicionario",
  }));

  const sugestoes = baseBusca.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase().trim()),
  );

  const navegarPara = () => {
    setBusca("");
  };

  const navegarPorBusca = () => {
    const termo = busca.toLowerCase().trim();

    if (!termo) return;

    const encontrada = palavras.find(
      (item) => item.palavra.toLowerCase() === termo,
    );

    if (!encontrada) {
      Alert.alert("Não encontrado", "Nenhuma palavra corresponde à busca.");
      return;
    }

    setBusca(encontrada.palavra);
  };

  return {
    busca,
    setBusca,
    favoritos,
    toggleFavorito,
    dadosFiltrados,
    sugestoes,
    navegarPara,
    navegarPorBusca,
  };
}