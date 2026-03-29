import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useCadastro = () => {
  const router = useRouter();
  const { origem } = useLocalSearchParams();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const [erro, setErro] = useState({
    nome: false,
    email: false,
    senha: false,
    confirmaSenha: false
  });

  const [mensagens, setMensagens] = useState<any>({});
  const [erroGeral, setErroGeral] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const focusAnimNome = useRef(new Animated.Value(0)).current;
  const focusAnimEmail = useRef(new Animated.Value(0)).current;
  const focusAnimSenha = useRef(new Animated.Value(0)).current;
  const focusAnimConfirma = useRef(new Animated.Value(0)).current;
  const errorAnim = useRef(new Animated.Value(0)).current;

  const animateFocus = (value: Animated.Value, toValue: number) => {
    Animated.timing(value, { toValue, duration: 200, useNativeDriver: false }).start();
  };

  const dispararErro = () => {
    Animated.timing(errorAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  const resetarErro = () => {
    Animated.timing(errorAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();

    setErro({ nome: false, email: false, senha: false, confirmaSenha: false });
    setMensagens({});
    setErroGeral('');
  };

  const emailValido = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarECadastrar = async () => {
    const novosErros = {
      nome: false,
      email: false,
      senha: false,
      confirmaSenha: false
    };

    const novasMensagens: any = {};

    if (!nome.trim()) {
      novosErros.nome = true;
      novasMensagens.nome = 'Nome é obrigatório';
    }

    if (!email.trim()) {
      novosErros.email = true;
      novasMensagens.email = 'E-mail é obrigatório';
    } else if (!emailValido(email)) {
      novosErros.email = true;
      novasMensagens.email = 'Digite um e-mail válido';
    }

    if (!senha.trim()) {
      novosErros.senha = true;
      novasMensagens.senha = 'Senha é obrigatória';
    } else if (senha.length < 6) {
      novosErros.senha = true;
      novasMensagens.senha = 'Mínimo 6 caracteres';
    }

    if (!confirmaSenha.trim()) {
      novosErros.confirmaSenha = true;
      novasMensagens.confirmaSenha = 'Confirme a senha';
    } else if (senha !== confirmaSenha) {
      novosErros.confirmaSenha = true;
      novasMensagens.confirmaSenha = 'Senhas diferentes';
    }

    const temErro = Object.values(novosErros).some(Boolean);

    if (temErro) {
      setErro(novosErros);
      setMensagens(novasMensagens);
      dispararErro();
      return;
    }

    try {
      const response = await fetch('https://brincalibras-api.onrender.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, confirmaSenha })
      });

      const data = await response.json();

      if (response.status === 400 || response.status === 409) {
        setErro({
          nome: !!data.fields?.nome,
          email: !!data.fields?.email,
          senha: !!data.fields?.senha,
          confirmaSenha: !!data.fields?.confirmaSenha
        });

        setMensagens(data.fields || {});
        dispararErro();
        return;
      }

      if (response.ok) {
        resetarErro();
        setSucesso(true);

        setNome('');
        setEmail('');
        setSenha('');
        setConfirmaSenha('');
      }

    } catch (e) {
      setErroGeral('Erro na conexão');
    }
  };

  const fecharESair = () => {
    setSucesso(false);

    if (origem === 'admin') {
      router.replace('/admin' as any);
    } else {
      router.replace('/login' as any);
    }
  };

  return {
    nome, setNome,
    email, setEmail,
    senha, setSenha,
    confirmaSenha, setConfirmaSenha,
    erro, mensagens, erroGeral, sucesso,
    validarECadastrar,
    animateFocus,
    focusAnimNome, focusAnimEmail, focusAnimSenha, focusAnimConfirma, errorAnim,
    fecharESair
  };
};