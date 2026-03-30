// app/footer/dicionario.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../src/contexts/themeContext";

const DADOS = [
  {
    id: "1",
    palavra: "Casa",
    descricao: "Junte as pontas dos dedos formando um telhado.",
    imagem: require("../../assets/images/dicionario/sinalCasa.png"),
  },
  {
    id: "2",
    palavra: "Amor",
    descricao: "Cruze os braços sobre o peito.",
    imagem: require("../../assets/images/dicionario/sinalAmor.png"),
  },
  
];

export default function DicionarioScreen() {
  const { theme } = useTheme();

  const [busca, setBusca] = useState("");
  const [favoritos, setFavoritos] = useState<string[]>([]);

  const dadosFiltrados = DADOS.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase())
  );

  const toggleFavorito = (id: string) => {
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter((f) => f !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* 🔍 BUSCA */}
      <View style={[styles.searchBox, { borderColor: theme.border }]}>
        <Ionicons name="search" size={20} color={theme.icon} />
        <TextInput
          placeholder="Buscar palavra..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
          style={[styles.input, { color: theme.text }]}
        />
      </View>

      {/* 📚 LISTA */}
      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isFavorito = favoritos.includes(item.id);

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
              <Image source={item.imagem} style={styles.image} />

              <View style={{ flex: 1 }}>
                <Text style={[styles.titulo, { color: theme.text }]}>
                  {item.palavra}
                </Text>

                <Text style={[styles.descricao, { color: theme.text }]}>
                  {item.descricao}
                </Text>
              </View>

              {/* ⭐ FAVORITO */}
              <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
                <Ionicons
                  name={isFavorito ? "star" : "star-outline"}
                  size={24}
                  color={isFavorito ? "#FFD700" : theme.icon}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
  },

  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: "center",
  },

  image: {
    width: 150,
    height: 150,
    marginRight: 12,
    resizeMode: "contain",
  },

  titulo: {
    fontSize: 16,
    fontWeight: "bold",
  },

  descricao: {
    fontSize: 13,
    marginTop: 4,
  },
});