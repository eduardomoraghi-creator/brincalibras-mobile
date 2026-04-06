import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../../../../src/contexts/themeContext";

export default function ExploreScreen() {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { backgroundColor: theme.footer }]}>
          <MaterialIcons
            name="search"
            size={64}
            color={theme.icon}
            style={styles.headerIcon}
          />

          <Text style={[styles.title, { color: theme.text || "#FFFFFF" }]}>
            Explorar
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: theme.textSecondary || theme.text || "#FFFFFF" },
            ]}
          >
            Encontre conteúdos, recursos e funcionalidades do app de forma
            simples.
          </Text>
        </View>

        <View style={styles.cardsContainer}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card || "#FFFFFF",
                borderColor: theme.footer,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text || "#111" }]}>
              Dicionário
            </Text>
            <Text
              style={[
                styles.cardText,
                { color: theme.textSecondary || theme.text || "#444" },
              ]}
            >
              Pesquise sinais e palavras de forma rápida.
            </Text>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card || "#FFFFFF",
                borderColor: theme.footer,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text || "#111" }]}>
              Atividades
            </Text>
            <Text
              style={[
                styles.cardText,
                { color: theme.textSecondary || theme.text || "#444" },
              ]}
            >
              Pratique com exercícios e desafios interativos.
            </Text>
          </View>

          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.card || "#FFFFFF",
                borderColor: theme.footer,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text || "#111" }]}>
              Jogos
            </Text>
            <Text
              style={[
                styles.cardText,
                { color: theme.textSecondary || theme.text || "#444" },
              ]}
            >
              Aprenda brincando com jogos educativos.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.banner,
              {
                backgroundColor: theme.card || "#FFFFFF",
                borderColor: theme.footer,
              },
            ]}
          >
            <Image
              source={require("@/src/assets/images/react-logo.png")}
              style={styles.bannerImage}
              contentFit="contain"
            />

            <View style={styles.bannerTextArea}>
              <Text style={[styles.bannerTitle, { color: theme.text || "#111" }]}>
                Destaque
              </Text>
              <Text
                style={[
                  styles.bannerText,
                  { color: theme.textSecondary || theme.text || "#444" },
                ]}
              >
                Personalize esta área com imagem, aviso ou atalho.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  header: {
    margin: 16,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  headerIcon: {
    marginBottom: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },

  cardsContainer: {
    paddingHorizontal: 16,
    gap: 14,
  },

  card: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },

  banner: {
    marginTop: 4,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1.5,
  },

  bannerImage: {
    width: "100%",
    height: 140,
  },

  bannerTextArea: {
    padding: 14,
  },

  bannerTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  bannerText: {
    fontSize: 14,
    lineHeight: 20,
  },
});