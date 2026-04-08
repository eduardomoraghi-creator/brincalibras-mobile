import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ResultadoLogin = {
  sucesso: boolean;
  destino?: string;
};

type ErrosLogin = {
  email: boolean;
  senha: boolean;
};

type MensagensLogin = {
  email?: string;
  senha?: string;
};

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<ErrosLogin>({ email: false, senha: false });
  const [mensagens, setMensagens] = useState<MensagensLogin>({});
  const [erroGeral, setErroGeral] = useState('');

  const focusAnimEmail = useRef(new Animated.Value(0)).current;
  const focusAnimSenha = useRef(new Animated.Value(0)).current;
  const errorAnim = useRef(new Animated.Value(0)).current;

  const animateFocus = (value: Animated.Value, toValue: number) => {
    Animated.timing(value, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const dispararErro = () => {
    Animated.sequence([
      Animated.timing(errorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const resetarErro = () => {
    Animated.timing(errorAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setErro({ email: false, senha: false });
    setMensagens({});
    setErroGeral('');
  };

  const emailValido = (valor: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  const validarESubmeter = async (): Promise<ResultadoLogin> => {
    resetarErro();

    let temErro = false;
    const novoErro: ErrosLogin = { email: false, senha: false };
    const novasMensagens: MensagensLogin = {};

    if (!email.trim()) {
      novoErro.email = true;
      novasMensagens.email = 'E-mail é obrigatório';
      temErro = true;
    } else if (!emailValido(email.trim())) {
      novoErro.email = true;
      novasMensagens.email = 'Digite um e-mail válido';
      temErro = true;
    }

    if (!senha.trim()) {
      novoErro.senha = true;
      novasMensagens.senha = 'Senha é obrigatória';
      temErro = true;
    }

    setErro(novoErro);
    setMensagens(novasMensagens);

    if (temErro) {
      dispararErro();
      return { sucesso: false };
    }

    try {
      const response = await fetch(
        'https://brincalibras-api.onrender.com/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            senha,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 400 || response.status === 401) {
        setErroGeral(data.message || 'E-mail ou senha inválidos');
        dispararErro();
        return { sucesso: false };
      }

      if (!response.ok) {
        setErroGeral(data.message || 'Erro ao fazer login');
        dispararErro();
        return { sucesso: false };
      }

      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
      }

      await AsyncStorage.setItem('role', data.role || 'USER');

      const usuarioParaSalvar = {
        id: data.id,
        nome: data.nome,
        email: data.email,
      };

      await AsyncStorage.setItem('user', JSON.stringify(usuarioParaSalvar));

      const destino =
        data.role === 'ADMIN' ? '/global/admin' : '/global/home';

      return {
        sucesso: true,
        destino,
      };
    } catch (error) {
      console.error('🔥 ERRO REAL LOGIN:', error);
      setErroGeral('Falha na conexão com o servidor');
      dispararErro();
      return { sucesso: false };
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    erro,
    mensagens,
    erroGeral,
    validarESubmeter,
    focusAnimEmail,
    focusAnimSenha,
    errorAnim,
    animateFocus,
  };
};