import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState({ email: false, senha: false });
  const [mensagens, setMensagens] = useState<any>({});
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

  const emailValido = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validarESubmeter = async () => {
    resetarErro();

    let temErro = false;
    const novoErro = { email: false, senha: false };
    const novasMensagens: any = {};

    if (!email.trim()) {
      novoErro.email = true;
      novasMensagens.email = 'E-mail é obrigatório';
      temErro = true;
    } else if (!emailValido(email)) {
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
      return;
    }

    try {
      const response = await fetch(
        'https://brincalibras-api.onrender.com/users/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha }),
        }
      );

      const data: any = await response.json();

      if (response.status === 400 || response.status === 401) {
        setErroGeral(data.message || 'E-mail ou senha inválidos');
        dispararErro();
        return;
      }

      if (!response.ok) {
        setErroGeral(data.message || 'Erro ao fazer login');
        dispararErro();
        return;
      }

      // ✅ SALVA TOKEN E ROLE
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
      }
      await AsyncStorage.setItem('role', data.role || 'USER');

      // ✅ SALVA USUÁRIO COMPLETO NO DEVICE
      const usuarioParaSalvar = {
        id: data.id,
        nome: data.nome,
        email: data.email,
      };
      await AsyncStorage.setItem('user', JSON.stringify(usuarioParaSalvar));

      // ✅ REDIRECIONA PARA HOME OU ADMIN
      const destino =
        data.role === 'ADMIN'
          ? '/global/admin'
          : '/global/home';
      router.replace(destino);

    } catch (error) {
      console.error('🔥 ERRO REAL LOGIN:', error);
      setErroGeral('Falha na conexão com o servidor');
      dispararErro();
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