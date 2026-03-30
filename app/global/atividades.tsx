// src/app/global/atividades.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AtividadesScreen() {
  const router = useRouter();

  const atividades = [
    { id: 1, imagem: require('../../assets/images/atividades/clima.png') },
    // outras atividades podem ser adicionadas aqui
  ];

  return (
    <View style={styles.container}>
      {/* HEADER padronizado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
        </TouchableOpacity>

        <View style={{ width: 26 }} /> {/* espaço para centralizar */}
      </View>

      {/* CONTEÚDO */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {atividades.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
              <View style={styles.iconWrapper}>
                <Image
                  source={item.imagem}
                  style={styles.iconImage}
                  resizeMode="contain"
                />
              </View>
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
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
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
    flex: 1,
  },

  iconImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
});