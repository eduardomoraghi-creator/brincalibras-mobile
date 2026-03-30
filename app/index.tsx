import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { AppState, Platform } from 'react-native';

// 🔥 simulação (depois liga com AsyncStorage ou API)
const usuarioLogado = false;

export default function Index() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Marca quando o componente está montado
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // só navega quando o Index estiver montado

    // No web pode ser necessário aguardar um tick para garantir que o RootLayout existe
    const timeout = setTimeout(() => {
      if (usuarioLogado) {
        router.replace('/global/home');
      } else {
        router.replace('/login');
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [mounted]);

  return null;
}