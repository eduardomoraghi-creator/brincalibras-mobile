import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
};

type AtualizarPerfilPayload = {
  nome?: string;
  email?: string;
};

type FeedbackPayload = {
  mensagem: string;
};

const API_URL = "https://brincalibras-api.onrender.com/users";
const STORAGE_KEY = "user";

export function usePerfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const limparErro = useCallback(() => {
    setErro("");
  }, []);

  const atualizarStorageUsuario = useCallback(async (user: Usuario) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, []);

  const obterUsuarioStorage = useCallback(async (): Promise<Usuario | null> => {
    const userStorage = await AsyncStorage.getItem(STORAGE_KEY);

    if (!userStorage) {
      return null;
    }

    try {
      return JSON.parse(userStorage) as Usuario;
    } catch {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }, []);

  const carregarUsuario = useCallback(async () => {
    try {
      setLoading(true);
      setErro("");

      const userStorage = await obterUsuarioStorage();

      if (!userStorage?.id) {
        setUsuario(null);
        setNome("");
        setEmail("");
        setErro("Usuário não encontrado no dispositivo");
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

      await atualizarStorageUsuario(usuarioNormalizado);

      return usuarioNormalizado;
    } catch (e) {
      console.error("carregarUsuario:", e);
      setErro("Erro ao carregar perfil");
      return null;
    } finally {
      setLoading(false);
    }
  }, [obterUsuarioStorage, atualizarStorageUsuario]);

  useEffect(() => {
    carregarUsuario();
  }, [carregarUsuario]);

  const salvarPerfil = useCallback(
    async (payload?: AtualizarPerfilPayload) => {
      if (!usuario?.id) {
        const mensagem = "Nenhum usuário logado";
        setErro(mensagem);
        throw new Error(mensagem);
      }

      try {
        setLoading(true);
        setErro("");

        const nomeFinal = (payload?.nome ?? nome).trim();
        const emailFinal = (payload?.email ?? email).trim();

        if (!nomeFinal) {
          throw new Error("Digite um nome válido");
        }

        if (!emailFinal || !emailFinal.includes("@")) {
          throw new Error("Digite um e-mail válido");
        }

        const body = {
          nome: nomeFinal,
          email: emailFinal,
        };

        const response = await fetch(`${API_URL}/${usuario.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const msg = await response.text();
          throw new Error(msg || "Erro ao atualizar perfil");
        }

        const updatedUser: Usuario = await response.json();

        const usuarioNormalizado: Usuario = {
          id: updatedUser.id,
          nome: updatedUser.nome ?? nomeFinal,
          email: updatedUser.email ?? emailFinal,
        };

        setUsuario(usuarioNormalizado);
        setNome(usuarioNormalizado.nome);
        setEmail(usuarioNormalizado.email);

        await atualizarStorageUsuario(usuarioNormalizado);

        return usuarioNormalizado;
      } catch (e) {
        console.error("salvarPerfil:", e);

        const mensagem =
          e instanceof Error ? e.message : "Erro ao atualizar perfil";

        setErro(mensagem);
        throw new Error(mensagem);
      } finally {
        setLoading(false);
      }
    },
    [usuario, nome, email, atualizarStorageUsuario],
  );

  const salvarSenha = useCallback(
    async (novaSenha: string) => {
      if (!usuario?.id) {
        const mensagem = "Nenhum usuário logado";
        setErro(mensagem);
        throw new Error(mensagem);
      }

      try {
        setLoading(true);
        setErro("");

        const senhaFinal = novaSenha.trim();

        if (!senhaFinal || senhaFinal.length < 6) {
          throw new Error("A senha deve ter no mínimo 6 caracteres");
        }

        const response = await fetch(`${API_URL}/${usuario.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome.trim(),
            email: email.trim(),
            senha: senhaFinal,
          }),
        });

        if (!response.ok) {
          const msg = await response.text();
          throw new Error(msg || "Erro ao alterar senha");
        }

        const updatedUser: Usuario = await response.json();

        const usuarioNormalizado: Usuario = {
          id: updatedUser.id,
          nome: updatedUser.nome ?? nome,
          email: updatedUser.email ?? email,
        };

        setUsuario(usuarioNormalizado);
        setNome(usuarioNormalizado.nome);
        setEmail(usuarioNormalizado.email);

        await atualizarStorageUsuario(usuarioNormalizado);

        return true;
      } catch (e) {
        console.error("salvarSenha:", e);

        const mensagem =
          e instanceof Error ? e.message : "Erro ao alterar senha";

        setErro(mensagem);
        throw new Error(mensagem);
      } finally {
        setLoading(false);
      }
    },
    [usuario, nome, email, atualizarStorageUsuario],
  );

  const enviarFeedback = useCallback(
    async ({ mensagem }: FeedbackPayload) => {
      try {
        setLoading(true);
        setErro("");

        const texto = mensagem.trim();

        if (!texto) {
          throw new Error("Digite uma mensagem antes de enviar");
        }

        /**
         * Ajuste aqui caso exista endpoint específico de feedback, por exemplo:
         * POST https://brincalibras-api.onrender.com/feedback
         *
         * Exemplo:
         * const response = await fetch("https://brincalibras-api.onrender.com/feedback", {
         *   method: "POST",
         *   headers: { "Content-Type": "application/json" },
         *   body: JSON.stringify({
         *     usuarioId: usuario?.id ?? null,
         *     nome: nome.trim(),
         *     email: email.trim(),
         *     mensagem: texto,
         *   }),
         * });
         *
         * if (!response.ok) {
         *   const msg = await response.text();
         *   throw new Error(msg || "Erro ao enviar feedback");
         * }
         */

        return {
          sucesso: true,
          mensagem: texto,
        };
      } catch (e) {
        console.error("enviarFeedback:", e);

        const mensagemErro =
          e instanceof Error ? e.message : "Erro ao enviar feedback";

        setErro(mensagemErro);
        throw new Error(mensagemErro);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const atualizarNomeLocal = useCallback((valor: string) => {
    setNome(valor);
  }, []);

  const atualizarEmailLocal = useCallback((valor: string) => {
    setEmail(valor);
  }, []);

  return {
    usuario,
    nome,
    setNome: atualizarNomeLocal,
    email,
    setEmail: atualizarEmailLocal,
    loading,
    erro,
    limparErro,
    carregarUsuario,
    salvarPerfil,
    salvarSenha,
    enviarFeedback,
  };
}