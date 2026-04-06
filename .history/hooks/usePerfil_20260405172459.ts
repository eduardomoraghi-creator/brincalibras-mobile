import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
};

type ResultadoSalvarPerfil = {
  sucesso: boolean;
  usuario?: Usuario;
};

type ResultadoSalvarSenha = {
  sucesso: boolean;
};

const API_URL = "https://brincalibras-api.onrender.com/users";
const STORAGE_KEY = "user";

export const usePerfil = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [erro, setErro] = useState({
    nome: false,
    email: false,
    senha: false,
    confirmarSenha: false,
  });

  const [mensagens, setMensagens] = useState<{
    nome?: string;
    email?: string;
    senha?: string;
    confirmarSenha?: string;
  }>({});

  const [erroGeral, setErroGeral] = useState("");

  const focusAnimNome = useRef(new Animated.Value(0)).current;
  const focusAnimEmail = useRef(new Animated.Value(0)).current;
  const focusAnimSenha = useRef(new Animated.Value(0)).current;
  const focusAnimConfirmarSenha = useRef(new Animated.Value(0)).current;
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

    setErro({
      nome: false,
      email: false,
      senha: false,
      confirmarSenha: false,
    });
    setMensagens({});
    setErroGeral("");
  };

  const emailValido = (valor: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);

  const obterUsuarioStorage = useCallback(async (): Promise<Usuario | null> => {
    try {
      const userStorage = await AsyncStorage.getItem(STORAGE_KEY);

      if (!userStorage) {
        return null;
      }

      const user = JSON.parse(userStorage) as Usuario;

      if (!user?.id) {
        return null;
      }

      return user;
    } catch (error) {
      console.error("Erro ao ler usuário do storage:", error);
      return null;
    }
  }, []);

  const salvarUsuarioStorage = useCallback(async (user: Usuario) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, []);

  const carregarUsuario = useCallback(async () => {
    try {
      setLoading(true);
      resetarErro();

      const userStorage = await obterUsuarioStorage();

      if (!userStorage?.id) {
        setUsuario(null);
        setNome("");
        setEmail("");
        setErroGeral("Usuário não encontrado no dispositivo");
        return null;
      }

      const response = await fetch(`${API_URL}/${userStorage.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
      }

      const data: Usuario = await response.json();

      const usuarioNormalizado: Usuario = {
        id: data.id,
        nome: data.nome ?? "",
        email: data.email ?? "",
      };

      setUsuario(usuarioNormalizado);
      setNome(usuarioNormalizado.nome);
      setEmail(usuarioNormalizado.email);

      await salvarUsuarioStorage(usuarioNormalizado);

      return usuarioNormalizado;
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      setErroGeral("Erro ao carregar perfil");
      return null;
    } finally {
      setLoading(false);
    }
  }, [obterUsuarioStorage, salvarUsuarioStorage]);

  useEffect(() => {
    carregarUsuario();
  }, [carregarUsuario]);

  const validarESalvarPerfil =
    useCallback(async (): Promise<ResultadoSalvarPerfil> => {
      if (!usuario?.id) {
        setErroGeral("Nenhum usuário logado");
        dispararErro();
        return { sucesso: false };
      }

      resetarErro();

      let temErro = false;

      const novoErro = {
        nome: false,
        email: false,
        senha: false,
        confirmarSenha: false,
      };

      const novasMensagens: {
        nome?: string;
        email?: string;
        senha?: string;
        confirmarSenha?: string;
      } = {};

      const nomeLimpo = nome.trim();
      const emailLimpo = email.trim();

      if (!nomeLimpo) {
        novoErro.nome = true;
        novasMensagens.nome = "Nome é obrigatório";
        temErro = true;
      } else if (nomeLimpo.length < 2) {
        novoErro.nome = true;
        novasMensagens.nome = "Digite um nome válido";
        temErro = true;
      }

      if (!emailLimpo) {
        novoErro.email = true;
        novasMensagens.email = "E-mail é obrigatório";
        temErro = true;
      } else if (!emailValido(emailLimpo)) {
        novoErro.email = true;
        novasMensagens.email = "Digite um e-mail válido";
        temErro = true;
      }

      setErro(novoErro);
      setMensagens(novasMensagens);

      if (temErro) {
        dispararErro();
        return { sucesso: false };
      }

      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/${usuario.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nomeLimpo,
            email: emailLimpo,
          }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          setErroGeral(data?.message || "Erro ao atualizar perfil");
          dispararErro();
          return { sucesso: false };
        }

        const usuarioAtualizado: Usuario = {
          id: data?.id ?? usuario.id,
          nome: data?.nome ?? nomeLimpo,
          email: data?.email ?? emailLimpo,
        };

        setUsuario(usuarioAtualizado);
        setNome(usuarioAtualizado.nome);
        setEmail(usuarioAtualizado.email);

        await salvarUsuarioStorage(usuarioAtualizado);

        return {
          sucesso: true,
          usuario: usuarioAtualizado,
        };
      } catch (error) {
        console.error("Erro ao salvar perfil:", error);
        setErroGeral("Falha na conexão com o servidor");
        dispararErro();
        return { sucesso: false };
      } finally {
        setLoading(false);
      }
    }, [usuario, nome, email, salvarUsuarioStorage]);

  const salvarSenha = useCallback(
    async (
      senha: string,
      confirmarSenha: string,
    ): Promise<ResultadoSalvarSenha> => {
      if (!usuario?.id) {
        setErroGeral("Nenhum usuário logado");
        dispararErro();
        return { sucesso: false };
      }

      resetarErro();

      let temErro = false;

      const novoErro = {
        nome: false,
        email: false,
        senha: false,
        confirmarSenha: false,
      };

      const novasMensagens: {
        nome?: string;
        email?: string;
        senha?: string;
        confirmarSenha?: string;
      } = {};

      const senhaLimpa = senha.trim();
      const confirmarSenhaLimpa = confirmarSenha.trim();

      if (!senhaLimpa) {
        novoErro.senha = true;
        novasMensagens.senha = "Senha é obrigatória";
        temErro = true;
      } else if (senhaLimpa.length < 6) {
        novoErro.senha = true;
        novasMensagens.senha = "Mínimo de 6 caracteres";
        temErro = true;
      }

      if (!confirmarSenhaLimpa) {
        novoErro.confirmarSenha = true;
        novasMensagens.confirmarSenha = "Confirme a senha";
        temErro = true;
      } else if (senhaLimpa !== confirmarSenhaLimpa) {
        novoErro.confirmarSenha = true;
        novasMensagens.confirmarSenha = "As senhas não coincidem";
        temErro = true;
      }

      setErro(novoErro);
      setMensagens(novasMensagens);

      if (temErro) {
        dispararErro();
        return { sucesso: false };
      }

      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/${usuario.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome.trim(),
            email: email.trim(),
            senha: senhaLimpa,
          }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          setErroGeral(data?.message || "Erro ao alterar senha");
          dispararErro();
          return { sucesso: false };
        }

        const usuarioAtualizado: Usuario = {
          id: data?.id ?? usuario.id,
          nome: data?.nome ?? nome.trim(),
          email: data?.email ?? email.trim(),
        };

        setUsuario(usuarioAtualizado);
        setNome(usuarioAtualizado.nome);
        setEmail(usuarioAtualizado.email);

        await salvarUsuarioStorage(usuarioAtualizado);

        return { sucesso: true };
      } catch (error) {
        console.error("Erro ao salvar senha:", error);
        setErroGeral("Falha na conexão com o servidor");
        dispararErro();
        return { sucesso: false };
      } finally {
        setLoading(false);
      }
    },
    [usuario, nome, email, salvarUsuarioStorage],
  );

  const limparFormularioPerfil = () => {
    if (usuario) {
      setNome(usuario.nome ?? "");
      setEmail(usuario.email ?? "");
    }
    resetarErro();
  };

  return {
    usuario,
    nome,
    setNome,
    email,
    setEmail,
    loading,
    erro,
    mensagens,
    erroGeral,
    carregarUsuario,
    validarESalvarPerfil,
    salvarSenha,
    limparFormularioPerfil,
    focusAnimNome,
    focusAnimEmail,
    focusAnimSenha,
    focusAnimConfirmarSenha,
    errorAnim,
    animateFocus,
    resetarErro,
  };
};