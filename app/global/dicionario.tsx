import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";

import { useTheme } from "../../src/contexts/themeContext";
import { useDicionario } from "../../hooks/useDicionario";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const GAP = 12;
const BUTTON_WIDTH = (width - HORIZONTAL_PADDING * 2 - GAP) / 2;

type ItemDicionario = {
  id: string;
  palavra: string;
  videoId?: string;
  tipo: "imagem" | "youtube";
};

export default function DicionarioScreen() {
  const { theme } = useTheme();
  const { busca, setBusca, dadosFiltrados, navegarPorBusca } = useDicionario();
  const router = useRouter();

  const [videoSelecionado, setVideoSelecionado] = useState<string | null>(null);

  const abrirVideo = (item: ItemDicionario) => {
    if (item.tipo === "youtube" && item.videoId) {
      setVideoSelecionado(item.videoId);
    }
  };

  const fecharVideo = () => {
    setVideoSelecionado(null);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Dicionário" }} />

      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <View
          style={[styles.headerComplemento, { backgroundColor: theme.header }]}
        >
          <View style={styles.searchWrapper}>
            <View
              style={[
                styles.searchBox,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                },
              ]}
            >
              <Ionicons name="search" size={20} color={theme.iconMuted} />

              <TextInput
                style={[styles.searchInput, { color: theme.inputText }]}
                placeholder="Ex: casa"
                placeholderTextColor={theme.inputPlaceholder}
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
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => abrirVideo(item)}
              style={[
                styles.botaoPalavra,
                {
                  width: BUTTON_WIDTH,
                  backgroundColor: "#2D9CDB",
                  borderColor: "#2D9CDB",
                },
              ]}
            >
              <Text style={styles.botaoPalavraTexto}>{item.palavra}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/global/alfabeto")}
          style={styles.botaoFlutuante}
        >
          <Ionicons name="book" size={22} color="#FFFFFF" />
          <Text style={styles.botaoFlutuanteTexto}>Alfabeto</Text>
        </TouchableOpacity>

        <Modal
          visible={!!videoSelecionado}
          animationType="fade"
          transparent
          onRequestClose={fecharVideo}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.botaoFechar}
              onPress={fecharVideo}
              activeOpacity={0.8}
            >
              <Ionicons name="close" size={34} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.playerWrapper}>
              {videoSelecionado && (
                <YoutubePlayer
                  key={videoSelecionado}
                  height={width * (9 / 16)}
                  play={false}
                  videoId={videoSelecionado}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerComplemento: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  searchWrapper: {
    paddingHorizontal: 20,
  },

  searchBox: {
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },

  listContent: {
    paddingTop: 22,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 100,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  botaoPalavra: {
    minHeight: 58,
    borderWidth: 1,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 14,
  },

  botaoPalavraTexto: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: "#FFFFFF",
  },

  botaoFlutuante: {
    position: "absolute",
    right: 20,
    bottom: 25,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#27AE60",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  botaoFlutuanteTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  botaoFechar: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 10,
    padding: 6,
  },

  playerWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
  },
});