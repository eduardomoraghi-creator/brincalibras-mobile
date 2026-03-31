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

  // Mantemos apenas o theme
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
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
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={irParaJogos}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/images/jogos/games.png")}
              style={styles.iconImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.card }]}
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
  },

  /* BANNER */
 banner: {
  marginHorizontal: 20,
  marginTop: 1,
  marginBottom: 1,
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
    marginTop: 10,
    marginBottom: 20,
  },

  botaoConfira: {
    alignItems: "center",
  },

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
