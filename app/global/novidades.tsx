import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useTheme } from "../../src/contexts/themeContext";
import { useHome } from "../../hooks/useHome";

export default function NovidadesScreen() {
  const { theme } = useTheme();
  const { irParaJogos, irParaAtividades, irParaDicionario } = useHome();

  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 900,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [pulseAnim]);

  const animatedShadowStyle = {
  shadowColor: "#7B2CBF",
  shadowOpacity: pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 0.45],
  }),
  shadowRadius: pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 22],
  }),
  elevation: pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 10],
  }),
  transform: [
    {
      scale: pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.03],
      }),
    },
  ],

  // 🔥 destaque visual no fundo claro
  borderWidth: pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 2],
  }),
  borderColor: "#7B2CBF",
};
  const novidades = [
    {
      id: 1,
      titulo: "Novos desafios",
      descricao:
        "Chegaram novas atividades para praticar, aprender e evoluir de forma divertida.",
      emoji: "🚀",
    },
    {
      id: 2,
      titulo: "Jogos atualizados",
      descricao:
        "Os jogos receberam melhorias para deixar a experiência mais leve e interativa.",
      emoji: "🎮",
    },
    {
      id: 3,
      titulo: "Novas descobertas",
      descricao:
        "Explore palavras, conceitos e conteúdos inéditos dentro do dicionário.",
      emoji: "📚",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.heroBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.heroTag, { color: theme.text }]}>
          NOVIDADES
          </Text>

          <Text style={[styles.heroTitle, { color: theme.text }]}>
            Confira o que chegou de novo
          </Text>

          <Text style={[styles.heroDescription, { color: theme.text }]}>
            Preparamos novidades especiais para tornar sua experiência ainda mais
            divertida, prática e cheia de descobertas.
          </Text>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Em destaque
        </Text>

        <View style={styles.highlightRow}>
          <Animated.View style={[styles.highlightWrapper, animatedShadowStyle]}>
            <TouchableOpacity
              style={[styles.highlightCard, { backgroundColor: theme.card }]}
              onPress={irParaAtividades}
              activeOpacity={0.85}
            >
              <Text style={styles.highlightEmoji}>✨</Text>
              <Text style={[styles.highlightTitle, { color: theme.text }]}>
                Atividades novas
              </Text>
              <Text style={[styles.highlightDescription, { color: theme.text }]}>
                Novos exercícios para praticar no seu ritmo.
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.highlightWrapper, animatedShadowStyle]}>
            <TouchableOpacity
              style={[styles.highlightCard, { backgroundColor: theme.card }]}
              onPress={irParaJogos}
              activeOpacity={0.85}
            >
              <Text style={styles.highlightEmoji}>🎯</Text>
              <Text style={[styles.highlightTitle, { color: theme.text }]}>
                Jogos renovados
              </Text>
              <Text style={[styles.highlightDescription, { color: theme.text }]}>
                Novas formas de aprender brincando.
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Últimas novidades
        </Text>

        {novidades.map((item) => (
          <View
            key={item.id}
            style={[styles.newsCard, { backgroundColor: theme.card }]}
          >
            <View style={styles.emojiBox}>
              <Text style={styles.newsEmoji}>{item.emoji}</Text>
            </View>

            <View style={styles.newsContent}>
              <Text style={[styles.newsTitle, { color: theme.text }]}>
                {item.titulo}
              </Text>
              <Text style={[styles.newsDescription, { color: theme.text }]}>
                {item.descricao}
              </Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.dictionaryButton}
          onPress={irParaDicionario}
          activeOpacity={0.8}
        >
          <Text style={styles.dictionaryButtonText}>
            Ver novidades no dicionário
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },

  heroBox: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  heroTag: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 8,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
    marginBottom: 10,
  },

  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },

  highlightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },

  highlightWrapper: {
    flex: 1,
    borderRadius: 20,
    shadowColor: "#7B2CBF",
  },

  highlightCard: {
    borderRadius: 20,
    padding: 16,
    minHeight: 150,
    shadowColor: "#000",
  },

  highlightEmoji: {
    fontSize: 28,
    marginBottom: 10,
  },

  highlightTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },

  highlightDescription: {
    fontSize: 14,
    lineHeight: 20,
  },

  newsCard: {
    flexDirection: "row",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  emojiBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  newsEmoji: {
    fontSize: 24,
  },

  newsContent: {
    flex: 1,
  },

  newsTitle: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },

  newsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },

  dictionaryButton: {
    marginTop: 10,
    backgroundColor: "#7B2CBF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  dictionaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});