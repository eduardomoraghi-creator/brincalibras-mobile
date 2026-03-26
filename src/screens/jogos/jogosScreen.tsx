import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function JogosScreen() {

  const iniciarJogo = (nome: string) => {
    alert(`Iniciando ${nome}...`);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.titulo}>🎮 Jogos</Text>

      {/* Jogo 1 */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => iniciarJogo('Quiz Libras')}
      >
        <Ionicons name="help-circle" size={40} color="#1E88E5" />
        <Text style={styles.cardTitulo}>Quiz Libras</Text>
        <Text style={styles.cardDesc}>
          Teste seus conhecimentos em Libras
        </Text>
      </TouchableOpacity>

      {/* Jogo 2 */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => iniciarJogo('Memória')}
      >
        <Ionicons name="grid" size={40} color="#1E88E5" />
        <Text style={styles.cardTitulo}>Jogo da Memória</Text>
        <Text style={styles.cardDesc}>
          Combine sinais iguais
        </Text>
      </TouchableOpacity>

      {/* Jogo 3 */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => iniciarJogo('Desafio')}
      >
        <Ionicons name="flash" size={40} color="#1E88E5" />
        <Text style={styles.cardTitulo}>Desafio Rápido</Text>
        <Text style={styles.cardDesc}>
          Responda o mais rápido possível
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10
  },

  cardDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4
  }
});