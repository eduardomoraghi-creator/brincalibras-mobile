import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import ParallaxScrollView from '../../../../src/components/parallax-scroll-view';
import { ThemedText } from '../../../../src/components/themed-text';
import { ThemedView } from '../../../../src/components/themed-view';
import { IconSymbol } from '../../../../src/components/ui/icon-symbol';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#2D9CDB', dark: '#1E1E1E' }}
      headerImage={
        <IconSymbol
          size={220}
          color="rgba(255,255,255,0.25)"
          name="magnifyingglass"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Explorar
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Encontre conteúdos, recursos e funcionalidades do app de forma simples.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Dicionário
          </ThemedText>
          <ThemedText style={styles.cardText}>
            Pesquise sinais e palavras de forma rápida.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Atividades
          </ThemedText>
          <ThemedText style={styles.cardText}>
            Pratique com exercícios e desafios interativos.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Jogos
          </ThemedText>
          <ThemedText style={styles.cardText}>
            Aprenda brincando com jogos educativos.
          </ThemedText>
        </ThemedView>

        <TouchableOpacity activeOpacity={0.8} style={styles.banner}>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.bannerImage}
            contentFit="contain"
          />
          <ThemedView style={styles.bannerTextArea}>
            <ThemedText type="defaultSemiBold" style={styles.bannerTitle}>
              Destaque
            </ThemedText>
            <ThemedText style={styles.bannerText}>
              Personalize esta área com imagem, aviso ou atalho.
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },

  headerImage: {
    position: 'absolute',
    bottom: -30,
    right: 10,
  },

  titleContainer: {
    gap: 6,
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.8,
  },

  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(45, 156, 219, 0.10)',
    gap: 6,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },

  banner: {
    marginTop: 8,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },

  bannerImage: {
    width: '100%',
    height: 140,
  },

  bannerTextArea: {
    padding: 14,
    gap: 4,
  },

  bannerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  bannerText: {
    fontSize: 14,
    lineHeight: 20,
  },
});