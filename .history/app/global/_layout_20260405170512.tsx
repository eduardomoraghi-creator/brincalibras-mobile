import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Slot, useRouter, useSegments } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme, ThemeProvider } from "../../src/contexts/themeContext";

const global_HEIGHT = 70;
const FOOTER_OFFSET = 8;

function LayoutContent() {
  const { theme, darkMode, toggleDarkMode } = useTheme();
  const router = useRouter();
  const segments = useSegments() as string[];
  const insets = useSafeAreaInsets();

  const rotaAtual = segments[segments.length - 1];
  const isHome = rotaAtual === "home";

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
      case "familia":
        return "Familia";
      case "memoria":
        return "Memoria";
      default:
        return rotaAtual;
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["top"]}
    >
      {/* HEADER */}
      {isHome ? (
        <View style={[styles.header, { backgroundColor: theme.background }]}>
          <View style={{ width: 20 }} />

          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/home/mao.png")}
              style={styles.logoMao}
            />

            <View style={styles.logoTextoWrapper}>
              <Image
                source={require("../../assets/images/home/BrincaLibras.png")}
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

      {/* CONTEÚDO */}
      <View
        style={[
          styles.content,
          {
            marginBottom: global_HEIGHT + insets.bottom + FOOTER_OFFSET,
          },
        ]}
      >
        <Slot />
      </View>

      {/* FOOTER */}
      <View
        style={[
          styles.global,
          {
            backgroundColor: theme.footer,
            height: global_HEIGHT,
            bottom: insets.bottom + FOOTER_OFFSET,
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.push("/global/perfil")}>
          <Ionicons name="person" size={35} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/global/dicionario")}>
          <Image
            source={require("../../assets/images/home/dicionario.png")}
            style={{
              width: 35,
              height: 35,
              resizeMode: "contain",
              tintColor: theme.icon, // opcional (explico abaixo)
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/global/home")}>
          <Ionicons name="home" size={35} color={theme.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/global/suporte")}>
          <Ionicons name="help-circle" size={35} color={theme.icon} />
        </TouchableOpacity>

        {/* 🔥 BOTÃO SEM CONDIÇÃO (SEMPRE VISÍVEL) */}
        <TouchableOpacity onPress={toggleDarkMode}>
          <FontAwesome5
            name={darkMode ? "sun" : "moon"}
            size={30}
            color={theme.icon}
            solid
          />
        </TouchableOpacity>
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
    paddingTop: 5,
    paddingBottom: 20,
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
    width: 55,
    height: 55,
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 2,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -3 },

    elevation: 12,
  },
});
