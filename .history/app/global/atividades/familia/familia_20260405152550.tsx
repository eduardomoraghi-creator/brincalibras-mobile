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

export default function FamiliaScreen() {
  const router = useRouter();

  // ROTAS TIPADAS
  const ROTAS = {
    atividades: "/global/atividades" as const, // ajuste aqui se sua tela pai tiver outro nome
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
    },
    {
      id: "a1",
      title: "Atividade 1 - Associar Sinais",
      progress: 60,
      link: ROTAS.atividade1,
    },
    {
      id: "aula2",
      title: "Aula 2 - Avôs e irmãos",
      progress: 0,
      link: ROTAS.aula2,
    },
    {
      id: "a2",
      title: "Atividade 2 - Árvore Genealógica",
      progress: 30,
      link: ROTAS.atividade2,
    },
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
   

        <View style={styles.headerCenter}>
          <MaterialIcons name="family-restroom" size={28} color="#fff" />
          <Text style={styles.headerTitle}>Família</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {cards.map((card) => (
          <View key={card.id} style={styles.card}>
            <View style={styles.cardRow}>
              <MaterialIcons name="people" size={28} color={PURPLE} />
              <Text style={styles.cardTitle}>{card.title}</Text>
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
              style={styles.actionBtn}
              onPress={() => router.replace(card.link)}
            >
              <Text style={styles.actionText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const PURPLE = "#6A04D1";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 70,
    backgroundColor: PURPLE,
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
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PURPLE,
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
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },
  progressContainer: {
    marginTop: 25,
    paddingHorizontal: 10,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  progressCount: {
    color: PURPLE,
    fontWeight: "700",
  },
  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: PURPLE,
    borderRadius: 10,
  },
  actionBtn: {
    marginTop: 12,
    backgroundColor: PURPLE,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
});
