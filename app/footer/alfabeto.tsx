// app/footer/alfabeto.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/contexts/themeContext'; 
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Exemplo simples de dicionário
const alfabeto = [
  { letra: 'A', imagem: require('../../assets/images/letras/A.png') },
  { letra: 'I', imagem: require('../../assets/images/letras/I.png') },
  { letra: 'O', imagem: require('../../assets/images/letras/O.png') },
];

export default function Alfabeto() {
  const { theme } = useTheme(); 
  const router = useRouter();

  const handleVoltar = () => {
    try {
      router.back();
    } catch {
      router.push("/footer/home");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
        </TouchableOpacity>

        {/* TÍTULO CENTRAL */}
        <Text style={[styles.headerTitle, { color: theme.text }]}>Dicionário</Text>

        {/* Placeholder à direita para manter centralizado */}
        <View style={{ width: 28 }} />
      </View>

      {/* LISTA DE LETRAS */}
      <FlatList
        data={alfabeto}
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

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  backButton: {
    width: 28,
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
  },

  /* LISTA DE LETRAS */
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