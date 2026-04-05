import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../src/contexts/themeContext";

export default function JogosScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.subtitulo, { color: theme.text || "#333" }]}>
          Escolha um jogo para começar
        </Text>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={() => router.push("/global/jogos/memoria/memoria")}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/images/jogos/games.png")}
              style={styles.iconImage}
            />
            <Text style={[styles.cardTitle, { color: theme.text || "#333" }]}>
              Memória
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.card, opacity: 0.6 }]}
            activeOpacity={1}
          >
            <Image
              source={require("../../assets/images/jogos/games.png")}
              style={styles.iconImage}
            />
            <Text style={[styles.cardTitle, { color: theme.text || "#333" }]}>
              Em breve
            </Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
  card: {
    width: "47%",
    minHeight: 180,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  iconImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});