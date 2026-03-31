import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, useRouter, useSegments } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme, ThemeProvider } from "../../src/contexts/themeContext";

const global_HEIGHT = 70;

function LayoutContent() {
  const { theme, darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const segments = useSegments() as string[];

  const rotaAtual = segments[segments.length - 1];
  const isHome = rotaAtual === "home";
  const isSuporte = rotaAtual === "suporte";

  // 🔥 NOVO: mostrar botão também na Home
  const mostrarDarkMode =
    rotaAtual === "suporte" ||
    rotaAtual === "home";

  const handleVoltar = () => {
    try {
      router.back();
    } catch {
      router.push("/global/home");
    }
  };

  const getTitulo = () => {
    switch (rotaAtual) {
      case "perfil":
        return "Perfil";
      case "dicionario":
        return "Dicionário";
      case "atividades":
        return "Atividades";
      case "jogos":
        return "Jogos";
      case "alfabeto":
        return "Alfabeto";
      case "suporte":
        return "Suporte";
      default:
        return rotaAtual?.toUpperCase();
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top", "bottom"]}
    >
      {/* 🔹 HEADER */}
      {isHome ? (
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <View style={{ width: 20 }} />

          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/homeLight/mao.png")}
              style={styles.logoMao}
            />

            <View style={styles.logoTextoWrapper}>
              <Image
                source={require("../../assets/images/homeLight/BrincaLibras.png")}
                style={styles.logoTexto}
              />
            </View>
          </View>

          <View style={{ width: 26 }} />
        </View>
      ) : (
        <View style={styles.headerInterno}>
          <Text style={styles.titulo}>{getTitulo()}</Text>

          <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
            <Image
              source={require("../../assets/images/header/arrow.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* 🔹 CONTEÚDO */}
      <View style={[styles.content, { marginBottom: global_HEIGHT }]}>
        <Slot />
      </View>

      {/* 🔹 FOOTER GLOBAL */}
      <View
        style={[
          styles.global,
          {
            backgroundColor: theme.footer,
            borderTopColor: theme.border || "#ccc",
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.push("/global/perfil")}>
          <Ionicons name="person" size={35} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/global/dicionario")}>
          <MaterialIcons name="menu-book" size={35} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/global/home")}>
          <Ionicons name="home" size={35} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/global/suporte")}>
          <Ionicons name="help-circle" size={35} color={theme.icon} />
        </TouchableOpacity>

        {/* 🔥 BOTÃO DARK MODE NA MESMA LINHA */}
        {mostrarDarkMode && (
          <TouchableOpacity onPress={toggleDarkMode}>
            <FontAwesome5
              name={darkMode ? "sun" : "moon"}
              size={30}
              color={theme.icon}
              solid
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoMao: {
    width: 60,
    height: 60,
    marginRight: 10,
  },

  logoTextoWrapper: {
    width: 180,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  logoTexto: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  headerInterno: {
    backgroundColor: "#2D9CDB",
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "600",
  },

  arrow: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  backButton: {
    padding: 8,
  },

  content: { flex: 1 },

  global: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: global_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0.5,
  },
});