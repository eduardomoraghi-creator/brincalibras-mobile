import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../src/contexts/themeContext";
import { useDicionario } from "../../hooks/useDicionario";

const { width, height } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const GAP = 12;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - GAP) / 2;

type ItemDicionario = {
  id: string;
  imagem: any;
  descricao: string;
};

export default function DicionarioScreen() {
  const { theme } = useTheme();

  const { busca, setBusca, dadosFiltrados, navegarPorBusca } = useDicionario();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<ItemDicionario | null>(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const hintOpacity = useRef(new Animated.Value(0)).current;
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const limparTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const fecharModal = () => {
    limparTimers();
    setModalVisivel(false);
    setItemSelecionado(null);
    scaleAnim.setValue(1);
    hintOpacity.setValue(0);
  };

  const abrirCardTelaCheia = (item: ItemDicionario) => {
    limparTimers();
    setItemSelecionado(item);
    setModalVisivel(true);
    scaleAnim.setValue(1);
    hintOpacity.setValue(0);

    const reduzirTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.52,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(hintOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3000);

    const fecharTimer = setTimeout(() => {
      fecharModal();
    }, 4500);

    timersRef.current.push(reduzirTimer, fecharTimer);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={[styles.headerComplemento, { backgroundColor: theme.header }]}>
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
              placeholder="Ex: casa, amor, escola..."
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
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => abrirCardTelaCheia(item)}
              style={[
                styles.card,
                {
                  width: CARD_WIDTH,
                  backgroundColor: theme.card,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <Image source={item.imagem} style={styles.image} />

              <Text
                style={[styles.descricao, { color: theme.textOnCard }]}
                numberOfLines={3}
              >
                {item.descricao}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          {itemSelecionado && (
            <>
              <Animated.View
                style={[
                  styles.modalCard,
                  {
                    transform: [{ scale: scaleAnim }],
                    backgroundColor: theme.card,
                  },
                ]}
              >
                <Image
                  source={itemSelecionado.imagem}
                  style={styles.modalImagem}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    styles.modalDescricao,
                    { color: theme.textOnCard },
                  ]}
                >
                  {itemSelecionado.descricao}
                </Text>
              </Animated.View>

              <Animated.Text
                style={[
                  styles.textoFechamento,
                  { opacity: hintOpacity, color: theme.textOnPrimary },
                ]}
              >
                A imagem será fechada automaticamente
              </Animated.Text>
            </>
          )}
        </View>
      </Modal>
    </View>
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
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },

  searchInput: {
    marginLeft: 100,
    flex: 1,
  },

  listContent: {
    paddingTop: 22,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 20,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.88)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalCard: {
    width: width - 30,
    height: height * 0.78,
    borderRadius: 22,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  modalImagem: {
    width: "100%",
    height: "78%",
    marginBottom: 18,
  },

  modalDescricao: {
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center",
    fontWeight: "600",
  },

  textoFechamento: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});