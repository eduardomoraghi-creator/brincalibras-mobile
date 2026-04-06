// Atividade2Screen.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";
import { TreeSlot } from "../../../../src/components/treeSlot";
import { useTreeActivity } from "@/hooks/useTreeActivity";

const PURPLE = "#6A04D1";
const GREEN = "#2E7D32";
const RED = "#D32F2F";
const GOLD = "#FFD700";
const BACKGROUND = "#F8F9FA";

export default function Atividade2Screen() {
  const router = useRouter();

  const {
    step,
    currentFase,
    options,
    isAnswered,
    isCorrect,
    handleAnswer,
    nextStep,
    total,
    totalQuestions,
    score,
    isFinished,
  } = useTreeActivity();

  const percent = totalQuestions ? (score / totalQuestions) * 100 : 0;

  // RESULTADO FINAL
  if (isFinished) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: PURPLE }]}>
        <View style={styles.resultContainer}>
          <MaterialIcons name="stars" size={90} color={GOLD} />

          <Text style={styles.resultTitle}>Atividade Concluída!</Text>

          <Text style={styles.score}>
            {score} / {totalQuestions}
          </Text>

          <TouchableOpacity
            style={styles.finishBtn}
            onPress={() =>
              router.replace("/global/atividades/familia/familia")
            }
          >
            <Text style={styles.finishText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const posicoes = currentFase?.posicoes ?? {};

  return (
    <SafeAreaView style={styles.screen}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/global/atividades/familia")}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Árvore Genealógica</Text>

        <Text style={styles.step}>
          {step + 1}/{total}
        </Text>
      </View>

      {/* PROGRESS */}
      <View style={styles.progressBar}>
        <View style={{ width: `${((step + 1) / total) * 100}%`, height: "100%", backgroundColor: GOLD }} />
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.question}>Quem falta?</Text>

        {/* ÁRVORE */}
        <View style={styles.tree}>
          <View style={styles.row}>
            <TreeSlot label={posicoes.top1?.label ?? ""} />
            <TreeSlot label={posicoes.top2?.label ?? ""} />
          </View>

          <View style={styles.row}>
            <TreeSlot label={posicoes.bottom?.label ?? ""} />
          </View>
        </View>

        {/* OPÇÕES */}
        <View style={styles.options}>
          {options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.option,
                isAnswered &&
                  opt.label === currentFase?.target &&
                  styles.correct,
                isAnswered &&
                  opt.label !== currentFase?.target &&
                  styles.wrong,
              ]}
              onPress={() => handleAnswer(opt.label)}
              disabled={isAnswered}
            >
              <MaterialCommunityIcons
                name="hand-front-right"
                size={28}
                color={PURPLE}
              />
              <Text style={styles.optionText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FEEDBACK */}
        {isAnswered && (
          <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
            <Text style={styles.nextText}>CONTINUAR</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BACKGROUND },

  header: {
    height: 70,
    backgroundColor: PURPLE,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  headerTitle: { color: "#fff", fontWeight: "700" },

  step: { color: "#fff" },

  progressBar: {
    height: 6,
    backgroundColor: "#ddd",
  },

  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },

  question: {
    fontSize: 20,
    fontWeight: "700",
  },

  tree: {
    marginVertical: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 10,
  },

  options: {
    flexDirection: "row",
    gap: 10,
  },

  option: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  optionText: {
    marginTop: 5,
    fontWeight: "600",
  },

  correct: {
    backgroundColor: "#E8F5E9",
  },

  wrong: {
    backgroundColor: "#FFEBEE",
  },

  nextBtn: {
    marginTop: 20,
    backgroundColor: PURPLE,
    padding: 14,
    borderRadius: 12,
  },

  nextText: {
    color: "#fff",
    fontWeight: "700",
  },

  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  resultTitle: {
    color: "#fff",
    fontSize: 22,
    marginTop: 10,
  },

  score: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "800",
  },

  finishBtn: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
  },

  finishText: {
    color: PURPLE,
    fontWeight: "700",
  },
});