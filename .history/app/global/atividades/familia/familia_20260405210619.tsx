import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const COLORS = {
  primary: "#6A04D1",
  primaryLight: "#F3E8FF",
  background: "#F8F7FC",
  white: "#FFFFFF",
  text: "#1F172A",
  textMuted: "#6B7280",
  border: "#E9D5FF",
  progressBg: "#E5E7EB",
  success: "#16A34A",
};

type CardItem = {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  link:
    | "/global/atividades/familia/introducao"
    | "/global/atividades/familia/atividade1"
    | "/global/atividades/familia/aula2"
    | "/global/atividades/familia/atividade2";
};

export default function FamiliaScreen() {
  const router = useRouter();

  const ROTAS = {
    introducao: "/global/atividades/familia/introducao" as const,
    atividade1: "/global/atividades/familia/atividade1" as const,
    aula2: "/global/atividades/familia/aula2" as const,
    atividade2: "/global/atividades/familia/atividade2" as const,
  };

  const cards: CardItem[] = [
    {
      id: "intro",
      title: "Introdução - Pais e Filhos",
      subtitle: "Aprenda os sinais básicos da família",
      progress: 100,
      link: ROTAS.introducao,
    },
    {
      id: "a1",
      title: "Atividade 1 - Associar Sinais",
      subtitle: "Associe cada sinal à palavra correta",
      progress: 60,
      link: ROTAS.atividade1,
    },
    {
      id: "aula2",
      title: "Aula 2 - Avôs e irmãos",
      subtitle: "Continue aprendendo novos sinais",
      progress: 0,
      link: ROTAS.aula2,
    },
    {
      id: "a2",
      title: "Atividade 2 - Árvore Genealógica",
      subtitle: "Complete a árvore com o sinal correto",
      progress: 30,
      link: ROTAS.atividade2,
    },
  ];

  const getButtonLabel = (progress: number) => {
    if (progress <= 0) return "Começar";
    if (progress >= 100) return "Revisar";
    return "Continuar";
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialIcons
            name="family-restroom"
            size={28}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.headerTextArea}>
          <Text style={styles.headerTitle}>Família</Text>
          <Text style={styles.headerSubtitle}>
            Estude lições e pratique com atividades
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Unidade disponível</Text>
          <Text style={styles.summaryText}>
            Acompanhe seu progresso nas lições e avance no seu ritmo.
          </Text>
        </View>

        {cards.map((card, index) => (
          <View key={card.id} style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.cardIconWrap}>
                <MaterialIcons name="people-alt" size={22} color={COLORS.primary} />
              </View>

              <View style={styles.cardTextArea}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </View>

              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{index + 1}</Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>Progresso</Text>
                <Text style={styles.progressCount}>{card.progress}%</Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[styles.progressFill, { width: `${card.progress}%` }]}
                />
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.actionBtn}
              onPress={() => router.replace(card.link)}
            >
              <Text style={styles.actionText}>
                {getButtonLabel(card.progress)}
              </Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: 26,
    paddingBottom: 22,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F4",
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerTextArea: {
    flex: 1,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 36,
  },
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  summaryTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  summaryText: {
    color: "#F3E8FF",
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EFE7FF",
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTextArea: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.text,
    lineHeight: 22,
  },
  cardSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  stepBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  stepBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },
  progressContainer: {
    marginTop: 18,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  progressCount: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 13,
  },
  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    backgroundColor: COLORS.progressBg,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },
  actionBtn: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
});