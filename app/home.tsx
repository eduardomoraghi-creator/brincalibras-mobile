import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function Home() {
  const router = useRouter();

  const sair = () => {
    router.replace('/');
  };

  const irParaJogos = () => {
    router.push('./jogos');
  };

  const irParaAtividades = () => {
    router.push('./atividades');
  };

  const irParaPerfil = () => {
    router.push('./perfil');
  };

  const irParaSuporte = () => {
    router.push('./suporte');
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          Brinca<Text style={{ fontWeight: 'bold' }}>Libras</Text>
        </Text>
      </View>

      {/* BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Está a fim de testar o seu conhecimento?
        </Text>

        <View style={styles.bannerRow}>
          <Ionicons name="trophy" size={40} color="#FFD700" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.bannerSubtitle}>
              Chegaram
            </Text>
            <Text style={styles.bannerHighlight}>
              NOVOS DESAFIOS
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>
            CONFIRA
          </Text>
        </TouchableOpacity>
      </View>

      {/* CARDS */}
      <View style={styles.cardsContainer}>
        
        {/* JOGOS */}
        <TouchableOpacity
          style={styles.card}
          onPress={irParaJogos}
        >
          <Ionicons
            name="game-controller"
            size={48}
            color="#1E88E5"
          />
          <Text style={styles.cardText}>
            JOGOS
          </Text>
        </TouchableOpacity>

        {/* ATIVIDADES */}
        <TouchableOpacity
          style={styles.card}
          onPress={irParaAtividades}
        >
          <MaterialIcons
            name="menu-book"
            size={48}
            color="#1E88E5"
          />
          <Text style={styles.cardText}>
            ATIVIDADES
          </Text>
        </TouchableOpacity>

      </View>

      {/* FOOTER MENU */}
      <View style={styles.footer}>
        
        <TouchableOpacity onPress={irParaPerfil}>
          <Ionicons name="person" size={26} color="#1E88E5" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialIcons name="sort-by-alpha" size={26} color="#1E88E5" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="home" size={26} color="#1E88E5" />
        </TouchableOpacity>

        <TouchableOpacity onPress={irParaSuporte}>
          <Ionicons name="help-circle" size={26} color="#1E88E5" />
        </TouchableOpacity>

        <TouchableOpacity onPress={sair}>
          <FontAwesome5 name="moon" size={22} color="#1E88E5" />
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  logo: {
    fontSize: 24,
    color: '#1E88E5'
  },

  banner: {
    backgroundColor: '#E91E63',
    padding: 20,
    alignItems: 'center'
  },

  bannerTitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16
  },

  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },

  bannerSubtitle: {
    color: '#fff',
    fontSize: 16
  },

  bannerHighlight: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  bannerButton: {
    backgroundColor: '#880E4F',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 20
  },

  bannerButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 20
  },

  card: {
    width: 150,
    height: 140,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3
  },

  cardText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold'
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff'
  }

});