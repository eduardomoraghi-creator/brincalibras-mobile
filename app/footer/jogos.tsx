import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 🔥 HOOK
import { useJogos } from '../../hooks/useJogos';

export default function JogosScreen() {
  const router = useRouter();
  const { iniciarJogo } = useJogos();

  const darkMode = false;
  const theme = darkMode ? dark : light;

  // Lista de jogos (simulados)
  const jogos = [
    {
      id: 1,
      titulo: 'Quiz Libras',
      descricao: 'Teste seus conhecimentos em Libras',
      icon: <Ionicons name="help-circle" size={40} color={theme.primary} />,
      tipo: 'Quiz Libras'
    },
    {
      id: 2,
      titulo: 'Jogo da Memória',
      descricao: 'Combine sinais iguais',
      icon: <Ionicons name="grid" size={40} color={theme.primary} />,
      tipo: 'Memória'
    },
    {
      id: 3,
      titulo: 'Desafio Rápido',
      descricao: 'Responda o mais rápido possível',
      icon: <Ionicons name="flash" size={40} color={theme.primary} />,
      tipo: 'Desafio'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* 🔥 HEADER PADRÃO COM VOLTAR */}
      <View style={[styles.header, { backgroundColor: theme.header }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Jogos</Text>

        <View style={{ width: 26 }} /> {/* espaço para centralizar */}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.titulo, { color: theme.text }]}>🎮 Escolha um jogo</Text>

        {jogos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={() => iniciarJogo(item.tipo)}
          >
            {item.icon}
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Text style={styles.cardDesc}>{item.descricao}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

/* 🔥 TEMAS */
const light = {
  background: '#FFFFFF',
  header: '#3A8FB7',
  card: '#FFFFFF',
  text: '#000',
  primary: '#1E88E5'
};

const dark = {
  background: '#2F2F2F',
  header: '#3A8FB7',
  card: '#EAEAEA',
  text: '#fff',
  primary: '#1E88E5'
};

/* 🔥 ESTILOS PADRONIZADOS */
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  content: { padding: 20, paddingBottom: 40 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { padding: 20, borderRadius: 16, marginBottom: 16, alignItems: 'center', elevation: 3 },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  cardDesc: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 4 }
});