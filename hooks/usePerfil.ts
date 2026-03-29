import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🔹 Tipo do Usuário
type Usuario = {
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

  // URL da API na nuvem (Render + Neon)
  const API_URL = 'https://brincalibras-api.onrender.com/users';

  useEffect(() => {
    carregarUsuario();
  }, []);

  // 🔹 Carrega usuário do AsyncStorage e API
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

      // 🔹 Busca do usuário direto na nuvem
      const response = await fetch(`${API_URL}/${user.id}`);
      if (!response.ok) throw new Error('Erro ao buscar usuário na nuvem');

      const data: Usuario = await response.json();

      // Atualiza estados
      setUsuario(data);
      setNome(data.nome || '');
      setEmail(data.email || '');

    } catch (e) {
      setErro('Erro ao carregar perfil da nuvem');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Salva alterações do perfil na nuvem
  const salvar = async () => {
    if (!usuario) {
      setErro('Nenhum usuário logado');
      return;
    }

    try {
      setLoading(true);
      setErro('');

      const response = await fetch(`${API_URL}/${usuario.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar perfil');

      alert('Perfil atualizado com sucesso!');
      setUsuario({ ...usuario, nome, email });

    } catch (e) {
      setErro('Erro ao atualizar perfil na nuvem');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    usuario,
    nome,
    setNome,
    email,
    setEmail,
    loading,
    erro,
    salvar,
  };
}