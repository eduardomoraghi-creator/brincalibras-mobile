import { useState } from "react";
import { Linking, Alert } from "react-native";
import { useRouter } from "expo-router";

type Pergunta = {
  pergunta: string;
  resposta: string;
};

export function useSuporte() {
  const router = useRouter();

  const telefone = "5511111111111";
  const email = "sac@brincalibras.com.br";

  const [darkMode, setDarkMode] = useState(false);
  const [mostrarMais, setMostrarMais] = useState(false);
  const [busca, setBusca] = useState("");

  const [perguntaSelecionada, setPerguntaSelecionada] =
    useState<Pergunta | null>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // 🔥 BASE DE BUSCA INTELIGENTE
  const baseBusca = [
    { palavra: "home", rota: "/footer/home" },
    { palavra: "inicio", rota: "/footer/home" },

    { palavra: "perfil", rota: "/footer/perfil" },
    { palavra: "usuario", rota: "/footer/perfil" },

    { palavra: "atividades", rota: "/footer/atividades" },
    { palavra: "exercicios", rota: "/footer/atividades" },

    { palavra: "jogos", rota: "/footer/jogos" },
    { palavra: "game", rota: "/footer/jogos" },

    { palavra: "dicionario", rota: "/footer/dicionario" },
    { palavra: "palavras", rota: "/footer/dicionario" },

    { palavra: "alfabeto", rota: "/footer/alfabeto" },
    { palavra: "letras", rota: "/footer/alfabeto" },

    { palavra: "suporte", rota: "/footer/suporte" },
    { palavra: "ajuda", rota: "/footer/suporte" },

    { palavra: "suporte", rota: "/footer/suporte" },
    { palavra: "ajuda", rota: "/footer/suporte" },

    { palavra: "suporte", rota: "/footer/suporte" },
    { palavra: "ajuda", rota: "/footer/suporte" },

    { palavra: "suporte", rota: "/footer/suporte" },
    { palavra: "ajuda", rota: "/footer/suporte" },
  ];

  // 🔍 FILTRO DINÂMICO
  const sugestoes = baseBusca.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase()),
  );

  // 🚀 NAVEGAÇÃO DIRETA
  const navegarPara = (rota: string) => {
    router.push(rota as any);
    setBusca("");
  };

  // 🔎 BUSCA MANUAL (enter)
  const navegarPorBusca = () => {
    const termo = busca.toLowerCase().trim();

    const encontrada = baseBusca.find((item) => termo.includes(item.palavra));

    if (encontrada) {
      navegarPara(encontrada.rota);
    } else {
      Alert.alert("Não encontrado", "Nenhuma página corresponde à busca.");
    }
  };

  // CONTATOS
  const abrirWhatsApp = async () => {
    const url = `https://wa.me/${telefone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert("Erro", "WhatsApp não disponível");
  };

  const ligar = async () => {
    Linking.openURL(`tel:${telefone}`);
  };

  const enviarEmail = async () => {
    Linking.openURL(`mailto:${email}`);
  };

  // FAQ
  const perguntas: Pergunta[] = [
    {
      pergunta: "Como compartilhar o meu progresso?",
      resposta:
        'Você pode compartilhar seu progresso acessando seu perfil e clicando em "Compartilhar".',
    },
    {
      pergunta: "É possível imprimir as minhas medalhas?",
      resposta:
        "Sim! Vá até seu perfil e selecione a medalha desejada para imprimir.",
    },
    {
      pergunta: "Como gerar um relatório das minhas lições diárias?",
      resposta: 'Acesse a aba de atividades e clique em "Relatórios".',
    },
    {
      pergunta: "Como redefinir minha senha?",
      resposta: 'Clique em "Esqueci minha senha" na tela de login.',
    },
    {
      pergunta: "O app funciona offline?",
      resposta: "Algumas funções funcionam offline, mas recomendamos internet.",
    },
    {
      pergunta: "Como entrar em contato com suporte?",
      resposta: "Use WhatsApp, ligação ou email nesta tela.",
    },
    {
      pergunta: "Posso usar em mais de um dispositivo?",
      resposta: "Sim, basta fazer login com sua conta.",
    },
  ];

  const perguntasVisiveis = mostrarMais ? perguntas : perguntas.slice(0, 3);

  const abrirPergunta = (item: Pergunta) => setPerguntaSelecionada(item);
  const voltarFAQ = () => setPerguntaSelecionada(null);

  return {
    telefone,
    email,
    darkMode,
    toggleDarkMode,
    abrirWhatsApp,
    ligar,
    enviarEmail,
    perguntasVisiveis,
    mostrarMais,
    setMostrarMais,
    perguntaSelecionada,
    abrirPergunta,
    voltarFAQ,

    // 🔥 BUSCA
    busca,
    setBusca,
    sugestoes,
    navegarPara,
    navegarPorBusca,
  };
}
