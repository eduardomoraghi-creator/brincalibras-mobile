import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { PerfilTheme } from "../../../../app/global/perfil";

type Props = {
  theme: PerfilTheme;
  progress: number;
  onDetalhesPress: () => void;
  onCompartilharPress: () => void;
};

export function DailyGoalCard({
  theme,
  progress,
  onDetalhesPress,
  onCompartilharPress,
}: Props) {
  return (
    <View
      style={[
        styles.metaCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.metaHeaderRow}>
        <View style={styles.metaTitleRow}>
          <Text style={styles.metaIcon}>🚀</Text>
          <Text style={[styles.metaTitle, { color: theme.text }]}>Meta diária</Text>
        </View>

        <TouchableOpacity
          onPress={onCompartilharPress}
          activeOpacity={0.8}
          style={styles.shareCircleButton}
        >
          <Ionicons name="share-social" size={20} color={theme.primary} />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.progressBarTrack,
          {
            borderColor: theme.primary,
            backgroundColor: theme.progressBg,
          },
        ]}
      >
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${progress * 100}%`,
              backgroundColor: theme.primary,
            },
          ]}
        />
      </View>

      <TouchableOpacity
        style={[styles.metaButton, { backgroundColor: theme.darkButton }]}
        onPress={onDetalhesPress}
        activeOpacity={0.85}
      >
        <Text style={styles.metaButtonText}>Visualizar progresso detalhado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  metaCard: {
    borderRadius: 16,
    borderWidth: 1.2,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
    marginBottom: 20,
  },

  metaHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  metaTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  metaTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  shareCircleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  progressBarTrack: {
    height: 16,
    borderRadius: 999,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 18,
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 999,
  },

  metaButton: {
    minHeight: 40,
    alignSelf: "center",
    borderRadius: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },

  metaButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});