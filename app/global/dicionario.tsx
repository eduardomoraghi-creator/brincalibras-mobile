import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../src/contexts/themeContext";
import { useDicionario } from "../../hooks/useDicionario";

export default function DicionarioScreen() {
  const { theme } = useTheme();

  const {
    busca,
    setBusca,
    favoritos,
    toggleFavorito,
    dadosFiltrados,
    sugestoes,
    navegarPara,
    navegarPorBusca,
  } = useDicionario();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* HEADER COMPLEMENTO */}
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

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* SUGESTÕES */}
        {busca.length > 0 && (
          <View style={[styles.sugestoesBox, { backgroundColor: theme.card }]}>
            {sugestoes.length > 0 ? (
              sugestoes.slice(0, 5).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.sugestaoCard}
                  activeOpacity={0.7}
                  onPress={navegarPara}
                >
                  <Ionicons
                    name="search-outline"
                    size={18}
                    color={theme.primary}
                    style={styles.sugestaoIcon}
                  />

                  <Text style={[styles.sugestaoTexto, { color: theme.text }]}>
                    {item.palavra}
                  </Text>

                  <Ionicons name="chevron-forward" size={18} color="#999" />
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  padding: 12,
                  color: theme.text,
                }}
              >
                Nenhuma sugestão encontrada
              </Text>
            )}
          </View>
        )}

        {/* LISTA */}
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 22 }}
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
      </ScrollView>
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

  sugestoesBox: {
    marginHorizontal: 20,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 12,
    paddingVertical: 4,
    elevation: 3,
  },

  sugestaoCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 0.5,
    borderColor: "#E0E0E0",
  },

  sugestaoIcon: {
    marginRight: 10,
  },

  sugestaoTexto: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },

  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 20,
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
