import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { PerfilTheme } from "../../../../app/global/perfil";

type Props = {
  theme: PerfilTheme;
  onVerMaisPress: () => void;
};

export function MedalsCard({ theme, onVerMaisPress }: Props) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <Ionicons name="ribbon" size={18} color={theme.primary} />
        <Text style={[styles.title, { color: theme.text }]}>Medalhas</Text>
      </View>

      <Image
        source={require("../../../../assets/medalhas.png")}
        style={styles.medalsImage}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.darkButton }]}
        onPress={onVerMaisPress}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Ver mais</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1.2,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 16,
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 8,
  },

  medalsImage: {
    width: "100%",
    height: 150,
    alignSelf: "center",
    marginBottom: 12,
  },

  button: {
    alignSelf: "center",
    minHeight: 42,
    borderRadius: 14,
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});