// src/hooks/useHome.ts
import { useRouter } from "expo-router";

export function useHome() {
  const router = useRouter();

  const irParaJogos = () => router.push("/global/jogos");
  const irParaAtividades = () => router.push("/global/atividades");
  const irParaPerfil = () => router.push("/global/perfil");
  const irParaSuporte = () => router.push("/global/suporte");
  const irParaHome = () => router.replace("/global/home"); // evita empilhar várias homes
  const irParaDicionario = () => router.push("/global/dicionario");

  return {
    irParaJogos,
    irParaAtividades,
    irParaPerfil,
    irParaSuporte,
    irParaHome,
    irParaDicionario,
  };
}