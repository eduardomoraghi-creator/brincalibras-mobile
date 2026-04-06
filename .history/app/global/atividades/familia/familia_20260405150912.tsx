import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../src/contexts/themeContext";

export default function FamiliaScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  const ROTAS = {
    atividades: "/global/atividades" as const,
    introducao: "/global/atividades/familia/introducao" as const,
    atividade1: "/global/atividades/familia/atividade1" as const,
    aula2: "/global/atividades/familia/aula2" as const,
    atividade2: "/global/atividades/familia/atividade2" as const,
  };

  const cards = [
    {
      id: "intro",
      title: "Introdução - Pais e Filhos",
      progress: 100,
      link: ROTAS.introducao,
      icon: "family-restroom" as const,
    },
    {
      id: "a1",
      title: "Atividade 1 - Associar Sinais",
      progress: 60,
      link: ROTAS.atividade1,
      icon: "record-voice-over" as const,
    },
    {
      id: "aula2",
      title: "Aula 2 - Avôs e irmãos",
      progress: 0,
      link: ROTAS.aula2,
      icon: "groups" as const,
    },
    {
      id: "a2",
      title: "Atividade 2 - Árvore Genealógica",
      progress: 30,
      link: ROTAS.atividade2,
      icon: "account-tree" as const,
    },
  ];

  const accent = theme.footer || "#6A04D1";
  const cardBackground = theme.card || theme.background || "#FFFFFF";
  const textColor = theme.text || "#111111";
  const secondaryText = theme.textSecondary || "#666666";

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: accent }]}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.replace(ROTAS.atividades)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <MaterialIcons name="family-restroom" size={28} color="#fff" />
          <Text style={styles.headerTitle}>Família</Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {cards.map((card) => (
          <View
            key={card.id}
            style={[
              styles.card,
              {
                backgroundColor: cardBackground,
                borderColor: accent,
              },
            ]}
          >
            <View style={styles.cardRow}>
              <MaterialIcons name={card.icon} size={28} color={accent} />
              <Text style={[styles.cardTitle, { color: textColor }]}>
                {card.title}
              </Text>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressInfo}>
                <Text style={[styles.progressText, { color: secondaryText }]}>
                  Progresso
                </Text>
                <Text style={[styles.progressCount, { color: accent }]}>
                  {card.progress}%
                </Text>
              </View>

              <View
                style={[
                  styles.progressTrack,
                  {
                    backgroundColor: theme.border || "#E0E0E0",
                  },
                ]}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${card.progress}%`,
                      backgroundColor: accent,
                    },
                  ]}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: accent }]}
              onPress={() => router.replace(card.link)}
              activeOpacity={0.85}
            >
              <Text style={styles.actionText}>
                {card.progress > 0 ? "Continuar" : "Começar"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  header: {
    height: 70,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  back: {
    position: "absolute",
    left: 12,
    zIndex: 10,
    padding: 8,
  },

  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },

  content: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
  },

  card: {
    borderRadius: 14,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    elevation: 3,
  },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },

  progressContainer: {
    marginTop: 20,
    paddingHorizontal: 4,
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressText: {
    fontSize: 14,
    fontWeight: "500",
  },

  progressCount: {
    fontWeight: "700",
    fontSize: 14,
  },

  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  actionBtn: {
    marginTop: 14,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});