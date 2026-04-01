import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

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
  const palavras: Palavra[] = [
    {
      id: "1",
      palavra: "Casa",
      descricao: "Junte as pontas dos dedos formando um telhado.",
      imagem: require("../assets/images/dicionario/casa.png"),
    },
    {
      id: "2",
      palavra: "Amor",
      descricao: "Cruze os braços sobre o peito.",
      imagem: require("../assets/images/dicionario/amor.png"),
    },
      {
      id: "3",
      palavra: "Escola",
      descricao: "Bata uma mão aberta sobre a outra.",
      imagem: require("../assets/images/dicionario/escola.png"),
    },
    {
      id: "4",
      palavra: "Água",
      descricao: "Leve a mão em forma de W até a boca.",
      imagem: require("../assets/images/dicionario/agua.png"),
    },
    {
      id: "5",
      palavra: "Família",
      descricao: "Faça um círculo com as mãos em frente ao corpo.",
      imagem: require("../assets/images/dicionario/familia.png"),
    },
    {
      id: "6",
      palavra: "Comer",
      descricao: "Leve a mão fechada até a boca.",
      imagem: require("../assets/images/dicionario/comer.png"),
    },
    /*
    {
      id: "7",
      palavra: "Brincar",
      descricao: "Mova as mãos abertas alternadamente.",
      imagem: require("../assets/images/dicionario/brincar.png"),
    },
    */
  ];

  // 🔍 FILTRO
  const dadosFiltrados = palavras.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase()),
  );

  // ⭐ FAVORITOS
  const toggleFavorito = (id: string) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // 🔥 BASE DE BUSCA (igual suporte)
  const baseBusca = palavras.map((p) => ({
    palavra: p.palavra,
    rota: "/global/dicionario",
  }));

  const sugestoes = baseBusca.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase()),
  );

  const navegarPara = () => {
    setBusca("");
  };

  const navegarPorBusca = () => {
    const termo = busca.toLowerCase().trim();

    const encontrada = palavras.find((item) =>
      item.palavra.toLowerCase().includes(termo),
    );

    if (!encontrada) {
      Alert.alert("Não encontrado", "Nenhuma palavra corresponde à busca.");
    }
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