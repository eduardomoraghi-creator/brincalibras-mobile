import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';

import { useJogos } from '../../hooks/useJogos';

export default function JogosScreen() {
  const router = useRouter();
  const { iniciarJogo } = useJogos();

  const jogos = [
    {
      id: 1,
      titulo: 'Quiz Libras',
      descricao: 'Teste seus conhecimentos em Libras',
      icon: <Ionicons name="help-circle" size={60} color="#1E88E5" />,
      tipo: 'Quiz Libras'
    },
    {
      id: 2,
      titulo: 'Jogo da Memória',
      descricao: 'Combine sinais iguais',
      icon: <Ionicons name="grid" size={60} color="#1E88E5" />,
      tipo: 'Memória'
    },
    {
      id: 3,
      titulo: 'Desafio Rápido',
      descricao: 'Responda o mais rápido possível',
      icon: <Ionicons name="flash" size={60} color="#1E88E5" />,
      tipo: 'Desafio'
    }
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
        </TouchableOpacity>

    
        <View style={{ width: 26 }} /> {/* espaço para centralizar */}
      </View>

      {/* TÍTULO */}
      <Text style={styles.screenTitle}>Jogos</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardsContainer}>
          {jogos.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => iniciarJogo(item.tipo)}
              activeOpacity={0.8}
            >
              <View style={styles.iconWrapper}>{item.icon}</View>
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },


  screenTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 15,
    color: '#000',
  },

  content: { paddingHorizontal: 20, paddingBottom: 40 },

  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  card: {
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },

  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // força centralização vertical
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },

  cardDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});