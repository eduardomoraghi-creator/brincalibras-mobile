import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AtividadesScreen() {

  const router = useRouter();

  const abrirAtividade = (nome: string) => {
    alert(`Abrindo ${nome}...`);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>📚 Atividades</Text>

      {/* Atividade 1 */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => abrirAtividade('Alfabeto')}
      >
        <MaterialIcons name="sort-by-alpha" size={40} color="#43A047" />
        <Text style={styles.cardTitulo}>Alfabeto em Libras</Text>
        <Text style={styles.cardDesc}>
          Aprenda letras e sinais básicos
        </Text>
      </TouchableOpacity>

      {/* Atividade 2 */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => abrirAtividade('Palavras')}
      >
        <MaterialIcons name="menu-book" size={40} color="#43A047" />
        <Text style={styles.cardTitulo}>Palavras</Text>
        <Text style={styles.cardDesc}>
          Expanda seu vocabulário
        </Text>
      </TouchableOpacity>

      {/* Atividade 3 */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => abrirAtividade('Frases')}
      >
        <MaterialIcons name="record-voice-over" size={40} color="#43A047" />
        <Text style={styles.cardTitulo}>Frases</Text>
        <Text style={styles.cardDesc}>
          Monte frases completas em Libras
        </Text>
      </TouchableOpacity>

      {/* Atividade 8 - Família */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/familia')}
      >
        <MaterialIcons name="people" size={40} color="#43A047" />
        <Text style={styles.cardTitulo}>Família</Text>
        <Text style={styles.cardDesc}>Sinais sobre membros da família</Text>
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