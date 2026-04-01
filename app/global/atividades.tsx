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

const CARD_SIZE = 150;
const ICON_SIZE = 110;
const BACKGROUND = '#FFFFFF';
const TEXT_COLOR = '#000000';

export default function AtividadesScreen() {
  const router = useRouter();

  const atividades = [
    {
      id: 8,
      imagem: require('../../assets/images/atividades/familia.png'),
      path: '../global/atividades/familia/familia' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={TEXT_COLOR} />
        </TouchableOpacity>

        <View style={styles.headerSpacer} />
      </View>

      <Text style={styles.screenTitle}>Atividades</Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {atividades.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
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
    backgroundColor: BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: BACKGROUND,
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
    color: TEXT_COLOR,
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
    backgroundColor: BACKGROUND,
    shadowColor: '#000',
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