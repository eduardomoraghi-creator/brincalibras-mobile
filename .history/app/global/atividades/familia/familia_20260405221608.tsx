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

const PURPLE = "#6A04D1";
const PURPLE_LIGHT = "#F4ECFF";
const BACKGROUND = "#F7F7FB";
const TEXT_DARK = "#1F1F28";
const TEXT_MEDIUM = "#6B6B7A";
const BORDER = "#E8DEF8";
const WHITE = "#FFFFFF";

export default function FamiliaScreen() {
  const router = useRouter();

  const ROTAS = {
    introducao: "/global/atividades/familia/introducao" as const,
    atividade1: "/global/atividades/familia/atividade1" as const,
    aula2: "/global/atividades/familia/aula2" as const,
    atividade2: "/global/atividades/familia/atividade2" as const,
  };

  const cards = [
    {
      id: "intro",
      title: "Introdução",
      subtitle: "Pais e filhos",
      progress: 100,
      icon: "play-circle-outline",
      link: ROTAS.introducao,
    },
    {
      id: "a1",
      title: "Atividade 1",
      subtitle: "Associar sinais",
      progress: 60,
      icon: "gesture",
      link: ROTAS.atividade1,
    },
    {
      id: "aula2",
      title: "Aula 2",
      subtitle: "Avós e irmãos",
      progress: 0,
      icon: "school",
      link: ROTAS.aula2,
    },
    {
      id: "a2",
      title: "Atividade 2",
      subtitle: "Árvore genealógica",
      progress: 30,
      icon: "account-tree",
      link: ROTAS.atividade2,
    },
  ];

  return (
    <View style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialIcons name="family-restroom" size={26} color="#fff" />
        </View>

        <View>
          <Text style={styles.headerTitle}>Família</Text>
          <Text style={styles.headerSubtitle}>
            Aprenda sinais do seu dia a dia
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* PROGRESSO GERAL */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Seu progresso</Text>

          <View style={styles.summaryBar}>
            <View style={[styles.summaryFill, { width: "55%" }]} />
          </View>

          <Text style={styles.summaryText}>
            Continue aprendendo para completar a unidade
          </Text>
        </View>

        {/* LISTA DE AULAS */}
        {cards.map((card, index) => {
          const isCompleted = card.progress === 100;

          return (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.replace(card.link)}
            >
              {/* ÍCONE */}
              <View style={styles.iconWrap}>
                <MaterialIcons
                  name={card.icon as any}
                  size={24}
                  color={PURPLE}
                />
              </View>

              {/* TEXTO */}
              <View style={styles.cardContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.cardTitle}>{card.title}</Text>

                  {isCompleted && (
                    <MaterialIcons
                      name="check-circle"
                      size={18}
                      color="#2E7D32"
                    />
                  )}
                </View>

                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>

                {/* PROGRESS BAR */}
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${card.progress}%` },
                    ]}
                  />
                </View>
              </View>

              {/* SETA */}
              <MaterialIcons
                name="chevron-right"
                size={24}
                color="#B0B0B0"
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  header: {
    backgroundColor: PURPLE,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#E6DAFF",
    fontSize: 13,
  },

  content: {
    padding: 18,
    paddingBottom: 40,
  },

  summaryCard: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },

  summaryTitle: {
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 10,
    color: TEXT_DARK,
  },

  summaryBar: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "#ECECF4",
    overflow: "hidden",
    marginBottom: 8,
  },

  summaryFill: {
    height: "100%",
    backgroundColor: PURPLE,
  },

  summaryText: {
    fontSize: 13,
    color: TEXT_MEDIUM,
  },

  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: PURPLE_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT_DARK,
  },

  cardSubtitle: {
    fontSize: 13,
    color: TEXT_MEDIUM,
    marginTop: 2,
    marginBottom: 10,
  },

  progressTrack: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#ECECF4",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: PURPLE,
  },
});