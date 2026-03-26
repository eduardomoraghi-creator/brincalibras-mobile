import { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState<any>(null);
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
        setErro('Usuário não encontrado');
        return;
      }

      const user = JSON.parse(userStorage);

      const response = await fetch(`${API_URL}/${user.id}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar usuário');
      }

      const data = await response.json();

      setUsuario(data);
      setNome(data.nome);
      setEmail(data.email);

    } catch (e) {
      setErro('Erro ao carregar perfil');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const salvar = async () => {
    try {
      setLoading(true);
      setErro('');

      const response = await fetch(`${API_URL}/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          email
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar');
      }

      alert('Perfil atualizado com sucesso!');

    } catch (e) {
      setErro('Erro ao atualizar perfil');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !usuario) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>

      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>
        Meu Perfil
      </Text>

      {erro ? (
        <Text style={{ color: 'red', marginBottom: 10 }}>
          {erro}
        </Text>
      ) : null}

      <Text style={{ marginBottom: 5 }}>Nome</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={{
          backgroundColor: '#eee',
          borderRadius: 10,
          padding: 12,
          marginBottom: 15
        }}
      />

      <Text style={{ marginBottom: 5 }}>E-mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: '#eee',
          borderRadius: 10,
          padding: 12,
          marginBottom: 20
        }}
      />

      <TouchableOpacity
        onPress={salvar}
        style={{
          backgroundColor: '#000',
          paddingVertical: 14,
          borderRadius: 10,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
          Salvar alterações
        </Text>
      </TouchableOpacity>

    </View>
  );
}