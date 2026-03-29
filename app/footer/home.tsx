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

export default function HomeScreen() {
  const { irParaJogos, irParaAtividades } = useHome();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {/* MÃO */}
          <Image
            source={require("../../assets/images/homeLight/mao.png")}
            style={styles.logoMao}
          />

          {/* LOGO BRINCALIBRAS */}
          <Image
            source={require("../../assets/images/homeLight/BrincaLibras.png")}
            style={styles.logoTexto}
          />
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
              source={require("../../assets/images/banner.png")}
              style={styles.bannerImage}
            />
          </View>
        </View>

        {/* BOTÃO CONFIRA */}
        <TouchableOpacity style={styles.botaoConfira} activeOpacity={0.8}>
          <Image
            source={require("../../assets/images/homeLight/confira.png")}
            style={styles.imagemBotao}
          />
        </TouchableOpacity>

        {/* CURVA */}
        <View style={styles.curve} />

        {/* CARDS */}
        <View style={styles.cardsContainer}>
          {/* JOGOS */}
          <TouchableOpacity
            style={styles.card}
            onPress={irParaJogos}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/images/homeLight/games.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>

          {/* ATIVIDADES */}
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* HEADER */
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  logoMao: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 10,
  },

  logoTexto: {
    width: 180,
    height: 60,
    resizeMode: "contain",
  },

  /* BANNER */
  banner: {
    marginHorizontal: 16,
    marginTop: 5,
    overflow: "hidden",
  },

  bannerContent: {
    width: "100%",
    height: 400,
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  /* CURVA */
  curve: {
    height: 130,
    marginTop: -50,
  },

  /* CARDS */
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -5,
    paddingHorizontal: 20,
  },

  card: {
    width: 180,
    height: 180,
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
    width: 130,
    height: 130,
    resizeMode: "contain",
  },

  botaoConfira: {
    alignItems: "center",
    marginTop: 10,
  },

  imagemBotao: {
    width: 180,
    height: 60,
    resizeMode: "contain",
  },
});