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
import { useTreeActivity } from "../../../../hooks/useTreeActivity";
import { useTheme } from "../../../../src/contexts/themeContext";

const GREEN = "#2E7D32";
const RED = "#D32F2F";
const GOLD = "#FFD700";

export default function Atividade2Screen() {
  const router = useRouter();
  const { theme } = useTheme();

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
  const posicoes = currentFase?.posicoes ?? {};

  const styles = createStyles(theme);

  if (isFinished) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: theme.primary }]}>
        <View style={styles.resultContainer}>
          <MaterialIcons name="stars" size={90} color={GOLD} />

          <Text style={styles.resultTitle}>Atividade Concluída!</Text>

          <Text style={styles.score}>
            {score} / {totalQuestions}
          </Text>

          <TouchableOpacity
            style={styles.finishBtn}
            onPress={() => router.replace("/global/atividades/familia/familia")}
          >
            <Text style={styles.finishText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/global/atividades/familia/familia")}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color={theme.textOnPrimary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Árvore Genealógica</Text>

        <Text style={styles.step}>
          {step + 1}/{total}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((step + 1) / total) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>Quem falta?</Text>

        <View style={styles.tree}>
          <View style={styles.row}>
            <TreeSlot label={posicoes.top1?.label ?? ""} />
            <TreeSlot label={posicoes.top2?.label ?? ""} />
          </View>

          <View style={styles.row}>
            <TreeSlot label={posicoes.bottom?.label ?? ""} />
          </View>
        </View>

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
                color={theme.primary}
              />
              <Text style={styles.optionText}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {isAnswered && (
          <TouchableOpacity style={styles.nextBtn} onPress={nextStep}>
            <Text style={styles.nextText}>CONTINUAR</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },

    header: {
      height: 70,
      backgroundColor: theme.header,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
    },

    headerTitle: {
      color: theme.textOnPrimary,
      fontWeight: "700",
    },

    step: {
      color: theme.textOnPrimary,
    },

    progressBar: {
      height: 6,
      backgroundColor: theme.border,
    },

    progressFill: {
      height: "100%",
      backgroundColor: GOLD,
    },

    content: {
      flex: 1,
      padding: 20,
      alignItems: "center",
    },

    question: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.text,
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
      backgroundColor: theme.card,
      padding: 16,
      borderRadius: 14,
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.cardBorder,
    },

    optionText: {
      marginTop: 5,
      fontWeight: "600",
      color: theme.textOnCard,
    },

    correct: {
      backgroundColor: "#E8F5E9",
      borderColor: GREEN,
    },

    wrong: {
      backgroundColor: "#FFEBEE",
      borderColor: RED,
    },

    nextBtn: {
      marginTop: 20,
      backgroundColor: theme.button,
      padding: 14,
      borderRadius: 12,
    },

    nextText: {
      color: theme.buttonText,
      fontWeight: "700",
    },

    resultContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    resultTitle: {
      color: theme.textOnPrimary,
      fontSize: 22,
      marginTop: 10,
    },

    score: {
      color: theme.textOnPrimary,
      fontSize: 40,
      fontWeight: "800",
    },

    finishBtn: {
      marginTop: 20,
      backgroundColor: theme.buttonText,
      padding: 14,
      borderRadius: 12,
    },

    finishText: {
      color: theme.primary,
      fontWeight: "700",
    },
  });