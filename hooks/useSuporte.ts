// hooks/useSuporte.ts
import { useState } from 'react';
import { Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// 🔥 TIPAGEM
type Pergunta = {
  pergunta: string;
  resposta: string;
};

// 🔥 TIPAGEM DE ROTAS
type RotaApp =
  | '/home'
  | '/perfil'
  | '/atividades'
  | '/jogos'
  | '/relatorios'
  | '/suporte'
  | '/login'
  | '/cadastro';

export function useSuporte() {
  const router = useRouter();

  const telefone = '5511111111111';
  const email = 'sac@brincalibras.com.br';

  const [darkMode, setDarkMode] = useState(false);
  const [mostrarMais, setMostrarMais] = useState(false);
  const [busca, setBusca] = useState('');

  const [perguntaSelecionada, setPerguntaSelecionada] = useState<Pergunta | null>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // 🔥 MAPA DE ROTAS
  const rotas: { palavras: string[]; rota: RotaApp }[] = [
    { palavras: ['home', 'inicio', 'início', 'menu'], rota: '/home' },
    { palavras: ['perfil', 'usuario', 'usuário', 'conta'], rota: '/perfil' },
    { palavras: ['atividade', 'atividades', 'lições', 'licoes', 'exercicios', 'exercícios'], rota: '/atividades' },
    { palavras: ['jogo', 'jogos', 'game', 'games', 'brincar', 'diversao', 'diversão'], rota: '/jogos' },
    { palavras: ['relatorio', 'relatórios', 'progresso', 'desempenho'], rota: '/relatorios' },
    { palavras: ['suporte', 'ajuda', 'faq', 'duvidas', 'dúvidas'], rota: '/suporte' },
    { palavras: ['login', 'entrar', 'acessar'], rota: '/login' },
    { palavras: ['cadastro', 'registrar', 'criar conta'], rota: '/cadastro' }
  ];

  // 🔥 BUSCA INTELIGENTE
  const navegarPorBusca = () => {
    const termo = busca.toLowerCase().trim();

    const rotaEncontrada = rotas.find(item =>
      item.palavras.some(p => termo.includes(p))
    );

    if (rotaEncontrada) {
      router.push(rotaEncontrada.rota as any); // navegação direta, sem tabs
    } else {
      Alert.alert('Não encontrado', 'Nenhuma página corresponde à busca.');
    }

    setBusca('');
  };

  // CONTATOS
  const abrirWhatsApp = async () => {
    const url = `https://wa.me/${telefone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) Linking.openURL(url);
    else Alert.alert('Erro', 'WhatsApp não disponível');
  };

  const ligar = async () => {
    Linking.openURL(`tel:${telefone}`);
  };

  const enviarEmail = async () => {
    Linking.openURL(`mailto:${email}`);
  };

  // FAQ
  const perguntas: Pergunta[] = [
    { pergunta: 'Como compartilhar o meu progresso?', resposta: 'Você pode compartilhar seu progresso acessando seu perfil e clicando em "Compartilhar".' },
    { pergunta: 'É possível imprimir as minhas medalhas?', resposta: 'Sim! Vá até seu perfil e selecione a medalha desejada para imprimir.' },
    { pergunta: 'Como gerar um relatório das minhas lições diárias?', resposta: 'Acesse a aba de atividades e clique em "Relatórios".' },
    { pergunta: 'Como redefinir minha senha?', resposta: 'Clique em "Esqueci minha senha" na tela de login.' },
    { pergunta: 'O app funciona offline?', resposta: 'Algumas funções funcionam offline, mas recomendamos internet.' },
    { pergunta: 'Como entrar em contato com suporte?', resposta: 'Use WhatsApp, ligação ou email nesta tela.' },
    { pergunta: 'Posso usar em mais de um dispositivo?', resposta: 'Sim, basta fazer login com sua conta.' }
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

    // BUSCA
    busca,
    setBusca,
    navegarPorBusca
  };
}