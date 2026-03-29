// hooks/useLogin.ts
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLogin = () => {
  const router = useRouter();

  // 🔹 Estados
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState({ email: false, senha: false });
  const [mensagens, setMensagens] = useState<any>({});
  const [erroGeral, setErroGeral] = useState('');

  // 🔹 Animações
  const focusAnimEmail = useRef(new Animated.Value(0)).current;
  const focusAnimSenha = useRef(new Animated.Value(0)).current;
  const errorAnim = useRef(new Animated.Value(0)).current;

  const animateFocus = (value: Animated.Value, toValue: number) => {
    Animated.timing(value, {
      toValue,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  const dispararErro = () => {
    Animated.sequence([
      Animated.timing(errorAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }),
    ]).start();
  };

  const resetarErro = () => {
    Animated.timing(errorAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();

    setErro({ email: false, senha: false });
    setMensagens({});
    setErroGeral('');
  };

  const emailValido = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔥 LOGIN
  const validarESubmeter = async () => {
    resetarErro();

    let temErro = false;
    const novoErro = { email: false, senha: false };
    const novasMensagens: any = {};

    // 🔹 Validação
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
      console.log("🔵 Tentando login...");
      console.log("EMAIL:", email);

      const response = await fetch('https://brincalibras-api.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        // ⚠️ IMPORTANTE:
        // Se seu backend usar "password", troque aqui
        body: JSON.stringify({
          email: email,
          senha: senha,
          // password: senha, ← use isso se necessário
        }),
      });

      console.log("🟡 STATUS:", response.status);

      // 🔥 Proteção contra resposta inválida
      let data: any = {};
      try {
        data = await response.json();
      } catch (err) {
        console.log("⚠️ Resposta não é JSON");
      }

      console.log("🟢 RESPONSE DATA:", data);

      // 🔴 Erros de validação backend
      if (response.status === 400) {
        const errosBack = {
          email: !!data.fields?.email,
          senha: !!data.fields?.senha,
        };

        const mensagensBack = {
          email: data.fields?.email,
          senha: data.fields?.senha,
        };

        setErro(errosBack);
        setMensagens(mensagensBack);
        dispararErro();
        return;
      }

      // 🔴 Credenciais inválidas
      if (response.status === 401) {
        setErroGeral(data.message || 'E-mail ou senha inválidos');
        dispararErro();
        return;
      }

      // 🔴 Outros erros
      if (!response.ok) {
        setErroGeral(data.message || 'Erro ao fazer login');
        dispararErro();
        return;
      }

      // ✅ SUCESSO
      console.log("✅ Login realizado com sucesso!");

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('role', data.role || 'USER');

      const destino =
        data.role === 'ADMIN'
          ? '/footer/admin'
          : '/footer/home';

      router.replace(destino);

    } catch (error) {
      console.error("🔥 ERRO REAL LOGIN:", error);
      setErroGeral('Falha na conexão com o servidor useLogin');
      dispararErro();
    }
  };

  return {
    email, setEmail,
    senha, setSenha,
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