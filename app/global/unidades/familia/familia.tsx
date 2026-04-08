import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { unidadeStyles } from "@/styles/unidadeStyles";

const COR_UNIDADE = "#6A04D1";
// Cor suave para o fundo do ícone (baseada na cor da unidade)
const SOFT_BG = "rgba(106, 4, 209, 0.1)"; 

export default function FamiliaScreen() {
  const router = useRouter();

  const ROTAS = {
    unidade: '/global/atividades' as const,
    introducao: '../familia/aulas/introducao' as const,
    atividade1: '../familia/atividades/atividade1' as const,
    aula2: '../familia/aulas/aula2' as const,
    atividade2: '../familia/atividades/atividade2' as const,
  };

  const cards = [
    {
      id: "intro",
      title: "Introdução - Pais e Filhos",
      subtitle: "Conheça os sinais básicos da família.",
      progress: 100,
      link: ROTAS.introducao,
    },
    {
      id: "a1",
      title: "Atividade 1 - Associar Sinais",
      subtitle: "Associe os sinais com atenção e prática.",
      progress: 60,
      link: ROTAS.atividade1,
    },
    {
      id: "aula2",
      title: "Aula 2 - Avôs e irmãos",
      subtitle: "Aprenda novos membros da família.",
      progress: 0,
      link: ROTAS.aula2,
    },
    {
      id: "a2",
      title: "Atividade 2 - Árvore Genealógica",
      subtitle: "Monte relações familiares passo a passo.",
      progress: 30,
      link: ROTAS.atividade2,
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.back} 
          onPress={() => router.push(ROTAS.unidade)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <View style={styles.headerIconWrapper}>
            <MaterialIcons name="family-restroom" size={28} color="#fff" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Família</Text>
            <Text style={styles.headerSubtitle}>Aulas e atividades</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {cards.map((card, index) => (
          <View key={card.id} style={styles.card}>
            {/* PARTE SUPERIOR DO CARD (Ícone + Textos) */}
            <View style={styles.cardTop}>
              <View style={[styles.iconBox, { backgroundColor: SOFT_BG }]}>
                <MaterialIcons name="people" size={24} color={COR_UNIDADE} />
              </View>

              <View style={styles.cardTextArea}>
                <Text style={[styles.cardStep, { color: COR_UNIDADE }]}>
                  Etapa {index + 1}
                </Text>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </View>
            </View>

            {/* BARRA DE PROGRESSO */}
            <View style={styles.progressContainer}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>Progresso</Text>
                <Text style={[styles.progressCount, { color: COR_UNIDADE }]}>
                  {card.progress}%
                </Text>
              </View>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill, 
                    { width: `${card.progress}%`, backgroundColor: COR_UNIDADE }
                  ]}
                />
              </View>
            </View>

            {/* BOTÃO DE AÇÃO */}
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: COR_UNIDADE }]}
              onPress={() => router.push(card.link)}
              activeOpacity={0.8}
            >
              <Text style={styles.actionText}>Continuar</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...unidadeStyles(COR_UNIDADE),
  
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // ESTILIZAÇÃO DO CARD ADAPTADA
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#EDE1FF", // Tom suave de roxo para a borda
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTextArea: {
    flex: 1,
  },
  cardStep: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1F2937",
    lineHeight: 22,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },
  progressCount: {
    fontWeight: "800",
    fontSize: 13,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  actionBtn: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
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