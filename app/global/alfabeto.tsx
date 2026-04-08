import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useTheme } from "../../src/contexts/themeContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const alfabeto = [
  { letra: "A", imagem: require("../../src/assets/images/letras/a.jpg") },
  { letra: "B", imagem: require("../../src/assets/images/letras/b.jpg") },
  { letra: "C", imagem: require("../../src/assets/images/letras/c.jpg") },
  { letra: "D", imagem: require("../../src/assets/images/letras/d.jpg") },
  { letra: "E", imagem: require("../../src/assets/images/letras/e.jpg") },
  { letra: "F", imagem: require("../../src/assets/images/letras/f.jpg") },
  { letra: "G", imagem: require("../../src/assets/images/letras/g.jpg") },
  { letra: "H", imagem: require("../../src/assets/images/letras/h.jpg") },
  { letra: "I", imagem: require("../../src/assets/images/letras/i.jpg") },
  { letra: "J", imagem: require("../../src/assets/images/letras/j.jpg") },
  { letra: "K", imagem: require("../../src/assets/images/letras/k.jpg") },
  { letra: "L", imagem: require("../../src/assets/images/letras/l.jpg") },
  { letra: "M", imagem: require("../../src/assets/images/letras/m.jpg") },
  { letra: "N", imagem: require("../../src/assets/images/letras/n.jpg") },
  { letra: "O", imagem: require("../../src/assets/images/letras/o.jpg") },
  { letra: "P", imagem: require("../../src/assets/images/letras/p.jpg") },
  { letra: "Q", imagem: require("../../src/assets/images/letras/q.jpg") },
  { letra: "R", imagem: require("../../src/assets/images/letras/r.jpg") },
  { letra: "S", imagem: require("../../src/assets/images/letras/s.jpg") },
  { letra: "T", imagem: require("../../src/assets/images/letras/t.jpg") },
  { letra: "U", imagem: require("../../src/assets/images/letras/u.jpg") },
  { letra: "V", imagem: require("../../src/assets/images/letras/v.jpg") },
  { letra: "W", imagem: require("../../src/assets/images/letras/w.jpg") },
  { letra: "X", imagem: require("../../src/assets/images/letras/x.jpg") },
  { letra: "Y", imagem: require("../../src/assets/images/letras/y.jpg") },
  { letra: "Z", imagem: require("../../src/assets/images/letras/z.jpg") },
];

type LetraItem = {
  letra: string;
  imagem: any;
};

export default function Alfabeto() {
  const { theme } = useTheme();
  const router = useRouter();
  const [letraSelecionada, setLetraSelecionada] = useState<LetraItem | null>(
    null,
  );

  const handleVoltar = () => {
    try {
      router.back();
    } catch {
      router.push("/global/home");
    }
  };

  const abrirModal = (item: LetraItem) => {
    setLetraSelecionada(item);

    setTimeout(() => {
      setLetraSelecionada(null);
    }, 3000);
  };

  const fecharModal = () => {
    setLetraSelecionada(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity onPress={handleVoltar} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Alfabeto
        </Text>

        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={alfabeto}
        keyExtractor={(item) => item.letra}
        numColumns={4}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.itemContainer,
              {
                backgroundColor: "#2D9CDB",
                borderColor: "#2D9CDB",
              },
            ]}
            onPress={() => abrirModal(item)}
          >
            <Text style={styles.letra}>{item.letra}</Text>
            <Image source={item.imagem} style={styles.imagem} />
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={!!letraSelecionada}
        animationType="fade"
        transparent
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.botaoFechar}
            onPress={fecharModal}
            activeOpacity={0.8}
          >
            <Ionicons name="close" size={34} color="#FFFFFF" />
          </TouchableOpacity>

          {letraSelecionada && (
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.background },
              ]}
            >
              <Text style={[styles.modalLetra, { color: theme.text }]}>
                {letraSelecionada.letra}
              </Text>

              <Image
                source={letraSelecionada.imagem}
                style={styles.modalImagem}
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },

  backButton: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
  },

  listContent: {
    padding: 16,
    paddingBottom: 100,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  itemContainer: {
    width: "22%",
    minHeight: 110,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  letra: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  imagem: {
    width: 46,
    height: 46,
    resizeMode: "contain",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.88)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  botaoFechar: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 10,
    padding: 6,
  },

  modalContent: {
    width: "90%",
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  modalLetra: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 20,
  },

  modalImagem: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
});
