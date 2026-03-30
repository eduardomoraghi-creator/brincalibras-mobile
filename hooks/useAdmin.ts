import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAdmin = () => {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [adminName, setAdminName] = useState<string | null>(null);

  useEffect(() => {
    const checarLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');

        if (!token || role !== 'ADMIN') {
          // redireciona para login se não for admin
          router.replace('/login' as any);
        } else {
          // opcional: buscar dados do admin no backend
          setAdminName('Administrador'); // ou pegar do backend
        }
      } catch (e) {
        console.error('Erro ao checar login do admin', e);
        router.replace('/login' as any);
      } finally {
        setCarregando(false);
      }
    };

    checarLogin();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('role');
    router.replace('/login' as any);
  };

  return { router, carregando, logout, adminName };
};