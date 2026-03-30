// app/footer/dicionario.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/contexts/themeContext'; 
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Exemplo simples de dicionário
const dicionario = [
  { letra: 'A', imagem: require('../../assets/images/letras/A.png') },
  { letra: 'I', imagem: require('../../assets/images/letras/I.png') },
  { letra: 'O', imagem: require('../../assets/images/letras/O.png') },
];

export default function DicionarioScreen() {
  const { theme } = useTheme(); 
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER topo igual Home + seta voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        </TouchableOpacity>

       
        <View style={{ width: 28 }} /> {/* placeholder para equilibrar o header */}
      </View>

      {/* TITULO */}
      <Text style={[styles.title, { color: theme.text }]}>Dicionário</Text>

      {/* LISTA DE LETRAS */}
      <FlatList
        data={dicionario}
        keyExtractor={(item) => item.letra}
        numColumns={4}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.letra, { color: theme.text }]}>{item.letra}</Text>
            <Image source={item.imagem} style={styles.imagem} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* HEADER topo igual Home + seta voltar */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF', // fundo branco
    paddingHorizontal: 15,
  },
  backButton: {
    width: 28,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },


  title: {
    fontSize: 30,

    textAlign: 'center',
    marginVertical: 16,
  },

  itemContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  letra: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  imagem: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain',
  },
});