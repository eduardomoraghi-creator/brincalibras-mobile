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
import { useTheme } from '../../src/contexts/themeContext';

const CARD_SIZE = 150;
const ICON_SIZE = 110;

export default function AtividadesScreen() {
  const router = useRouter();
  const { theme, darkMode } = useTheme();

  const atividades = [
    {
      id: 8,
      imagem: require('../../assets/images/atividades/familia.png'),
      path: '/global/atividades/familia/familia' as const, // ✅ CORRIGIDO
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.border || '#ddd',
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        </TouchableOpacity>

        <View style={styles.headerSpacer} />
      </View>

      <Text style={[styles.screenTitle, { color: theme.text }]}>
        Atividades
      </Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {atividades.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: theme.card,
                  shadowColor: darkMode ? '#000' : '#000',
                },
              ]}
              activeOpacity={0.8}
              onPress={() => router.push(item.path)}
            >
              <Image
                source={item.imagem}
                style={styles.iconImage}
                resizeMode="contain"
              />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
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
    marginVertical: 15,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 15,
  },
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});