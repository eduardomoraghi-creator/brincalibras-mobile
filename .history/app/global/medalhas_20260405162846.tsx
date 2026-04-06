import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

type Atividade = {
  id: number;
  titulo: string;
  progresso: number;
  total: number;
};

export default function MedalhasScreen() {
  const router = useRouter();

  const atividadesFamilia: Atividade[] = [
    { id: 1, titulo: "Pai", progresso: 4, total: 10 },
    { id: 2, titulo: "Mãe", progresso: 7, total: 10 },
    { id: 3, titulo: "Irmão", progresso: 3, total: 10 },
    { id: 4, titulo: "Irmã", progresso: 8, total: 10 },
    { id: 5, titulo: "Avô", progresso: 2, total: 10 },
    { id: 6, titulo: "Avó", progresso: 6, total: 10 },
  ];

  const percentualCategoria = Math.round(
    atividadesFamilia.reduce((acc, item) => acc + item.progresso, 0) /
      atividadesFamilia.reduce((acc, item) => acc + item.total, 0) *
      100
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>

          <Text style={styles.subtitle}>
            Andamento das atividades e evolução por tema
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Categoria atual: Família</Text>
          <Text style={styles.summaryText}>
            Progresso geral: {percentualCategoria}%
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${percentualCategoria}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Atividades de Família</Text>

          {atividadesFamilia.map((atividade) => {
            const percentual = Math.round(
              (atividade.progresso / atividade.total) * 100
            );

            return (
              <View key={atividade.id} style={styles.itemCard}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{atividade.titulo}</Text>
                  <Text style={styles.itemPercent}>{percentual}%</Text>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[styles.progressFill, { width: `${percentual}%` }]}
                  />
                </View>

                <Text style={styles.itemMeta}>
                  {atividade.progresso} de {atividade.total} atividades concluídas
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Próximas categorias</Text>
          <Text style={styles.infoText}>
            A estrutura desta tela já está pronta para receber novas categorias,
            como alimentos, cores, números, escola e animais.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 22,
  },

  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#E7E7E7",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 14,
  },

  backButtonText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "700",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 16,
    color: "#555555",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 8,
  },

  summaryText: {
    fontSize: 16,
    color: "#444444",
    marginBottom: 14,
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 16,
  },

  itemCard: {
    backgroundColor: "#F8F8F8",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },

  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111111",
  },

  itemPercent: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2A9DF4",
  },

  itemMeta: {
    fontSize: 14,
    color: "#666666",
    marginTop: 8,
  },

  progressTrack: {
    height: 12,
    backgroundColor: "#DFDFDF",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#2A9DF4",
    borderRadius: 999,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 10,
  },

  infoText: {
    fontSize: 15,
    color: "#555555",
    lineHeight: 22,
  },
});