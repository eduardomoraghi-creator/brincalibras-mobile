import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { getDictionaryItems } from "../src/data/librasHelpers";

type Palavra = {
  id: string;
  palavra: string;
  descricao: string;
  imagem: any;
};

export function useDicionario() {
  const router = useRouter();

  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState<string[]>([]);

  // 📚 BASE DO DICIONÁRIO
  const palavras: Palavra[] = useMemo(() => getDictionaryItems(), []);

  // 🔍 FILTRO
  const dadosFiltrados = palavras.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase().trim()),
  );

  // ⭐ FAVORITOS
  const toggleFavorito = (id: string) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // 🔥 BASE DE BUSCA
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

    const encontrada = palavras.find((item) =>
      item.palavra.toLowerCase().includes(termo),
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