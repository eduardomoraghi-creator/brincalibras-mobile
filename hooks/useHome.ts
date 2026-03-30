// src/hooks/useHome.ts
import { useRouter } from "expo-router";

export function useHome() {
  const router = useRouter();

  const irParaJogos = () => router.push("/footer/jogos");
  const irParaAtividades = () => router.push("/footer/atividades");
  const irParaPerfil = () => router.push("/footer/perfil");
  const irParaSuporte = () => router.push("/footer/suporte");
  const irParaHome = () => router.replace("/footer/home"); // evita empilhar várias homes
  const irParaDicionario = () => router.push("/footer/dicionario");

  return {
    irParaJogos,
    irParaAtividades,
    irParaPerfil,
    irParaSuporte,
    irParaHome,
    irParaDicionario,
  };
}