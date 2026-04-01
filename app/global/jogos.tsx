import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useJogos } from '../../hooks/useJogos';

export default function JogosScreen() {
  const router = useRouter();
  const { iniciarJogo } = useJogos();

  const jogos = [
    {
      id: 1,
      titulo: 'Quiz Libras',
      descricao: 'Teste seus conhecimentos em Libras',
      iconName: 'help-circle' as const,
      tipo: 'Quiz Libras',
    },
    {
      id: 2,
      titulo: 'Jogo da Memória',
      descricao: 'Combine sinais iguais',
      iconName: 'grid' as const,
      tipo: 'Memória',
    },
    {
      id: 3,
      titulo: 'Desafio Rápido',
      descricao: 'Responda o mais rápido possível',
      iconName: 'flash' as const,
      tipo: 'Desafio',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.screenTitle}>Jogos</Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {jogos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => iniciarJogo(item.tipo)}
              activeOpacity={0.8}
            >
              <View style={styles.iconWrapper}>
                <Ionicons name={item.iconName} size={60} color="#1E88E5" />
              </View>

              <Text style={styles.cardTitulo}>{item.titulo}</Text>
              <Text style={styles.cardDesc}>{item.descricao}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerSpacer: {
    width: 26,
  },
  screenTitle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  card: {
    width: 150,
    minHeight: 190,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  cardDesc: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
  },
});