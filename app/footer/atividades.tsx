import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function AtividadesScreen() {
  // Lista de atividades simuladas com figuras
  const atividades = [
    {
      id: 1,
      imagem: require("../../assets/images/atividades/clima.png"), // substitua pelo arquivo real
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={styles.header}>Atividades BrincaLibras</Text>

      <View style={styles.cardsContainer}>
        {atividades.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => console.log(`Clicou na atividade ${item.id}`)}
          >
            <Image
              source={item.imagem}
              style={styles.cardImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "transparent", 
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    padding: 0, // remove espaço interno
    elevation: 0,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
