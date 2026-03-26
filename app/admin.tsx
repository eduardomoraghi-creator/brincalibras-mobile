import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  role: string;
};

export default function AdminScreen() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erroGeral, setErroGeral] = useState('');

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nomeEditado, setNomeEditado] = useState('');
  const [emailEditado, setEmailEditado] = useState('');

  const [modalExcluirVisivel, setModalExcluirVisivel] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState<Usuario | null>(null);

  const API_URL = 'https://brincalibras-api.onrender.com/users';

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      setErroGeral('');

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }

      const data = await response.json();
      const usuariosOrdenados = data.sort((a: Usuario, b: Usuario) => a.id - b.id);

      setUsuarios(usuariosOrdenados);
    } catch (error) {
      setErroGeral('Não foi possível carregar os usuários.');
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setCarregando(false);
    }
  };

  const iniciarEdicao = (usuario: Usuario) => {
    setEditandoId(usuario.id);
    setNomeEditado(usuario.nome);
    setEmailEditado(usuario.email);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNomeEditado('');
    setEmailEditado('');
  };

  const salvarEdicao = async () => {
    if (editandoId === null) return;

    try {
      setErroGeral('');

      const response = await fetch(`${API_URL}/${editandoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nomeEditado,
          email: emailEditado
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar usuário');
      }

      await carregarUsuarios();
      cancelarEdicao();
    } catch (error) {
      setErroGeral('Não foi possível atualizar o usuário.');
      console.error('Erro ao editar usuário:', error);
    }
  };

  const excluirUsuario = async (id: number) => {
    try {
      setErroGeral('');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
      }

      await carregarUsuarios();
      fecharModalExclusao();
    } catch (error) {
      setErroGeral('Não foi possível excluir o usuário.');
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const abrirModalExclusao = (usuario: Usuario) => {
    setUsuarioParaExcluir(usuario);
    setModalExcluirVisivel(true);
  };

  const fecharModalExclusao = () => {
    setUsuarioParaExcluir(null);
    setModalExcluirVisivel(false);
  };

  const confirmarExclusao = () => {
    if (usuarioParaExcluir) {
      excluirUsuario(usuarioParaExcluir.id);
    }
  };

  const sair = () => {
    router.replace('/' as any);
  };

  const irParaCadastro = () => {
    router.push('/cadastro?origem=admin' as any);
  };

  const renderUsuario = ({ item }: { item: Usuario }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Usuário #{item.id}</Text>
      <Text style={styles.cardText}>Nome: {item.nome}</Text>
      <Text style={styles.cardText}>E-mail: {item.email}</Text>
      <Text style={styles.cardText}>Perfil: {item.role}</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => iniciarEdicao(item)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => abrirModalExclusao(item)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Administrativo</Text>
      <Text style={styles.subtitle}>Gerenciamento de usuários</Text>

      <View style={styles.topActions}>
        <TouchableOpacity style={styles.loadButton} onPress={carregarUsuarios}>
          <Text style={styles.buttonText}>Atualizar lista</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createButton} onPress={irParaCadastro}>
          <Text style={styles.buttonText}>Incluir usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={sair}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {erroGeral ? <Text style={styles.errorText}>{erroGeral}</Text> : null}

      {carregando ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUsuario}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum usuário carregado ainda.
            </Text>
          }
        />
      )}

      {editandoId !== null && (
        <View style={styles.editBox}>
          <Text style={styles.editTitle}>Editar usuário</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nomeEditado}
            onChangeText={setNomeEditado}
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={emailEditado}
            onChangeText={setEmailEditado}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={salvarEdicao}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={cancelarEdicao}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal
        visible={modalExcluirVisivel}
        transparent
        animationType="fade"
        onRequestClose={fecharModalExclusao}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={styles.modalText}>
              Deseja realmente excluir o usuário{' '}
              <Text style={styles.modalStrong}>
                {usuarioParaExcluir?.nome}
              </Text>
              ?
            </Text>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={fecharModalExclusao}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={confirmarExclusao}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
    paddingTop: 48
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16
  },
  topActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    flexWrap: 'wrap'
  },
  loadButton: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  createButton: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#388E3C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  logoutButton: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#757575',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  loader: {
    marginTop: 20
  },
  listContent: {
    paddingBottom: 20
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: '#1976D2'
  },
  deleteButton: {
    backgroundColor: '#D32F2F'
  },
  saveButton: {
    backgroundColor: '#388E3C'
  },
  cancelButton: {
    backgroundColor: '#757575'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
  editBox: {
    marginTop: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12
  },
  editTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 12,
    fontWeight: '600'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12
  },
  modalText: {
    fontSize: 16,
    color: '#333'
  },
  modalStrong: {
    fontWeight: 'bold'
  }
});