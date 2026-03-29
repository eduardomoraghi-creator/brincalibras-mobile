// app/footer/dicionario.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useTheme } from '../../src/contexts/themeContext'; // ✅ correto
import { useHome } from '../../hooks/useHome'; // (mantido caso use navegação depois)

// Exemplo simples de dicionário
const dicionario = [
  { letra: 'A', imagem: require('../../assets/images/letras/A.png') },
  { letra: 'I', imagem: require('../../assets/images/letras/I.png') },
  { letra: 'O', imagem: require('../../assets/images/letras/O.png') },
];

export default function DicionarioScreen() {
  const { theme } = useTheme(); // ✅ agora vem do contexto global

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.logo }]}>
        Dicionário de Libras
      </Text>

      <FlatList
        data={dicionario}
        keyExtractor={(item) => item.letra}
        numColumns={4}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={[styles.letra, { color: theme.text }]}>
              {item.letra}
            </Text>
            <Image source={item.imagem} style={styles.imagem} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
  },
  letra: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4
  },
  imagem: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
});