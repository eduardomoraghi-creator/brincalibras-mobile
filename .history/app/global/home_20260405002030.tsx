import React from "react";
import {
  Pressable,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  Dimensions,
} from "react-native";
import { useHome } from "../../hooks/useHome";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const { irParaJogos, irParaAtividades, irParaNovidades } = useHome();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.bannerContainer}>
          <Image
            source={require("../../assets/images/home/banner.png")}
            style={styles.bannerImage}
          />

          <Pressable
            style={({ pressed }) => [
              styles.botaoConfira,
              pressed && styles.botaoPressionado,
            ]}
            onPress={irParaNovidades}
          >
            <Text style={styles.textoBotao}>CONFIRA</Text>
          </Pressable>
        </View>

        <View style={styles.homeSection}>
          <View style={styles.blueBackground} />

          <Image
            source={require("../../assets/images/home/elipse.png")}
            style={styles.elipseImage}
            resizeMode="cover"
          />

          <View style={styles.cardsContainer}>
            <Pressable style={styles.card} onPress={irParaJogos}>
              <Image
                source={require("../../assets/images/jogos/games.png")}
                style={styles.iconImage}
              />
              <Text style={styles.cardLabel}>JOGOS</Text>
            </Pressable>

            <Pressable style={styles.card} onPress={irParaAtividades}>
              <Image
                source={require("../../assets/images/home/atividades.png")}
                style={styles.iconImage}
              />
              <Text style={styles.cardLabel}>ATIVIDADES</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  scrollContent: {
    paddingBottom: 120,
    backgroundColor: "#F2F2F2",
  },

  bannerContainer: {
    width: "100%",
    height: 255,
    marginTop: -7,
    position: "relative",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  botaoConfira: {
    position: "absolute",
    right: 39,
    bottom: 30,
    width: 118,
    height: 38,
    borderRadius: 22,
    backgroundColor: "#7B1E4A",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  botaoPressionado: {
    transform: [{ scale: 0.97 }],
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  homeSection: {
    marginTop: -8,
    position: "relative",
    width: "100%",
    height: 340,
    backgroundColor: "#F2F2F2",
  },

  blueBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: 235,
    backgroundColor: "#2D9CDB",
  },

  elipseImage: {
    position: "absolute",
    top: -5,
    left: 0,
    width: width,
    height: 150,
  },

  cardsContainer: {
    position: "absolute",
    top: 58,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
    zIndex: 3,
  },

  card: {
    width: 140,
    height: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: "#3DA0E3",
  },

  iconImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  cardLabel: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "900",
    color: "#111111",
  },
});