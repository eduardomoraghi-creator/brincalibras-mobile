// hooks/usePerfil.ts
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Usuario = {
  id: string;
  nome: string;
  email: string;
};

export function usePerfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const API_URL = 'https://brincalibras-api.onrender.com/users';

  useEffect(() => {
    carregarUsuario();
  }, []);

  const carregarUsuario = async () => {
    try {
      setLoading(true);
      setErro('');

      const userStorage = await AsyncStorage.getItem('user');
      if (!userStorage) {
        setErro('Usuário não encontrado no dispositivo');
        setLoading(false);
        return;
      }

      const user: Usuario = JSON.parse(userStorage);

      const response = await fetch(`${API_URL}/${user.id}`);
      if (!response.ok) throw new Error('Erro ao buscar usuário');

      const data: Usuario = await response.json();

      setUsuario(data);
      setNome(data.nome ?? '');
      setEmail(data.email ?? '');
    } catch (e) {
      setErro('Erro ao carregar perfil');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const salvar = async (novaSenha?: string) => {
    if (!usuario) {
      setErro('Nenhum usuário logado');
      return;
    }

    try {
      setLoading(true);
      setErro('');

      const body: any = { nome, email };

      // envia senha somente se foi informada
      if (novaSenha && novaSenha.length >= 6) {
        body.senha = novaSenha;
      }

      const response = await fetch(`${API_URL}/${usuario.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Erro ao atualizar perfil');

      // atualiza estado local
      setUsuario({ ...usuario, nome, email });
      alert('Perfil atualizado com sucesso!');
    } catch (e) {
      setErro('Erro ao atualizar perfil');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { usuario, nome, setNome, email, setEmail, loading, erro, salvar };
}