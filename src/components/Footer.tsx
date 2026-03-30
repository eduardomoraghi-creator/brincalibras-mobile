// src/components/Footer.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../contexts/themeContext";

export default function Footer() {
  const router = useRouter();
  const { theme, darkMode, toggleDarkMode } = useTheme();

  return (
    <View style={[styles.footer, { backgroundColor: theme.footer }]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/footer/home")}
      >
        <Ionicons name="home-outline" size={24} color={theme.icon} />
        <Text style={[styles.label, { color: theme.text }]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/footer/atividades")}
      >
        <Ionicons name="clipboard-outline" size={24} color={theme.icon} />
        <Text style={[styles.label, { color: theme.text }]}>Atividades</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/footer/jogos")}
      >
        <Ionicons name="game-controller-outline" size={24} color={theme.icon} />
        <Text style={[styles.label, { color: theme.text }]}>Jogos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/footer/dicionario")}
      >
        <Ionicons name="book-outline" size={24} color={theme.icon} />
        <Text style={[styles.label, { color: theme.text }]}>Dicionário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/footer/perfil")}
      >
        <MaterialIcons name="person-outline" size={24} color={theme.icon} />
        <Text style={[styles.label, { color: theme.text }]}>Perfil</Text>
      </TouchableOpacity>

      {/* 🌙 Dark Mode */}
      <TouchableOpacity style={styles.button} onPress={toggleDarkMode}>
        <Ionicons
          name={darkMode ? "sunny" : "moon"}
          size={24}
          color={theme.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});