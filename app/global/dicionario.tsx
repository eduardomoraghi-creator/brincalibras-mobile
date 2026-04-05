import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../src/contexts/themeContext";
import { useDicionario } from "../../hooks/useDicionario";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const GAP = 12;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - GAP) / 2;

export default function DicionarioScreen() {
  const { theme } = useTheme();

  const {
    busca,
    setBusca,
    dadosFiltrados,
    navegarPorBusca,
  } = useDicionario();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.headerComplemento}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#8E8E8E" />

            <TextInput
              style={styles.searchInput}
              placeholder="Ex: casa, amor, escola..."
              placeholderTextColor="#8E8E8E"
              value={busca}
              onChangeText={setBusca}
              onSubmitEditing={navegarPorBusca}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.card,
                {
                  width: CARD_WIDTH,
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                },
              ]}
            >
              <Image source={item.imagem} style={styles.image} />

              <Text
                style={[styles.descricao, { color: theme.text }]}
                numberOfLines={3}
              >
                {item.descricao}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerComplemento: {
    backgroundColor: "#2D9CDB",
    paddingTop: 10,
    paddingBottom: 20,
  },

  searchWrapper: {
    paddingHorizontal: 20,
  },

  searchBox: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },

  listContent: {
    paddingTop: 22,
    paddingHorizontal: HORIZONTAL_PADDING,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
  },

  image: {
    width: "100%",
    height: CARD_WIDTH - 12,
    resizeMode: "contain",
    marginBottom: 6,
  },

  descricao: {
    fontSize: 13,
    lineHeight: 18,
  },
});