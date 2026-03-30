// src/app/footer/home.tsx
import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { useHome } from "../../hooks/useHome";
import { useTheme } from "../../src/contexts/themeContext";

export default function HomeScreen() {
  const { irParaJogos, irParaAtividades } = useHome();
  const { theme } = useTheme(); // para cores dinâmicas caso queira no futuro

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER centralizado com MÃO e BRINCALIBRAS */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* BANNER */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Image
              source={require("../../assets/images/homeLight/banner.png")}
              style={styles.bannerImage}
            />
          </View>
        </View>

        {/* BOTÃO CONFIRA */}
        <View style={styles.botaoContainer}>
          <TouchableOpacity style={styles.botaoConfira} activeOpacity={0.8}>
            <Image
              source={require("../../assets/images/homeLight/confira.png")}
              style={styles.imagemBotao}
            />
          </TouchableOpacity>
        </View>

        {/* CARDS */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            onPress={irParaJogos}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/images/jogos/games.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={irParaAtividades}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/images/homeLight/atividades.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* HEADER */
  header: {
    paddingTop: 45,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

 
  /* BANNER */
  banner: {
    marginHorizontal: 16,
    marginTop: 5,
    overflow: "hidden",
  },

  bannerContent: {
    width: "100%",
    height: 300,
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  /* BOTÃO CONFIRA */
  botaoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  botaoConfira: { alignItems: "center" },

  imagemBotao: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },

  /* CARDS */
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingHorizontal: 20,
  },

  card: {
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },

  iconImage: {
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
});