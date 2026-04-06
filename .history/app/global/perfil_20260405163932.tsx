import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { usePerfil } from "../../hooks/usePerfil";

const fotoUsuarioImg = require("../../assets/images/perfil/foto-usuario.png");
const medalhasImg = require("../../assets/images/perfil/medalhas.png");
const dadosCadastraisImg = require("../../assets/images/perfil/dados-cadastrais.png");
const feedbackImg = require("../../assets/images/perfil/feedback.png");
const compartilharImg = require("../../assets/images/perfil/compartilhe-app.png");

const LIGHT = {
  primary: "#2D9CDB",
  background: "#EDEDED",
  card: "#F5F5F5",
  border: "#3EA0DD",
  darkButton: "#666666",
  danger: "#F20D0D",
  text: "#111111",
  progressBg: "#F0F0F0",
  solidFieldBg: "#FFFFFF",
  solidFieldBorder: "#D6D6D6",
};

const DARK = {
  ...LIGHT,
  background: "#111418",
  card: "#1C2229",
  progressBg: "#2B333D",
};

export default function PerfilScreen() {
  const router = useRouter();
  const navTheme = useTheme();
  const theme = navTheme.dark ? DARK : LIGHT;

  const {
    usuario,
    nome,
    email,
    loading,
    salvarPerfil,
    salvarSenha,
    enviarFeedback,
  } = usePerfil();

  const [feedback, setFeedback] = useState("");
  const [feedbackAtivo, setFeedbackAtivo] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const nomeExibicao = nome || "Seu nome aqui";
  const emailExibicao = email || "seuemail@aqui.com";

  const mensagemCompartilhamento = useMemo(
    () =>
      "Venha aprender Libras comigo no BrincaLibras!",
    [],
  );

  const compartilharNativo = async () => {
    await Share.share({ message: mensagemCompartilhamento });
  };

  const compartilharWhatsapp = async () => {
    const url = `whatsapp://send?text=${encodeURIComponent(
      mensagemCompartilhamento,
    )}`;
    const supported = await Linking.canOpenURL(url);
    supported ? Linking.openURL(url) : compartilharNativo();
  };

  const abrirOpcoesCompartilhamento = () => {
    setShareModalVisible(true);
  };

  if (loading && !usuario) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>

          {/* FOTO */}
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={fotoUsuarioImg}
              style={{ width: 120, height: 120, borderRadius: 60, alignSelf: "center" }}
            />
          </TouchableOpacity>

          {/* META */}
          <View style={[styles.card, { backgroundColor: theme.card }]}>
            <View style={styles.row}>
              <Text>🚀 Meta diária</Text>

              <TouchableOpacity onPress={abrirOpcoesCompartilhamento}>
                <Ionicons name="share-social" size={22} color={theme.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* DADOS */}
          <View style={styles.imageCard}>
            <Image source={dadosCadastraisImg} style={styles.banner} />

            <View style={styles.overlay}>
              <TouchableOpacity
                style={styles.inputFake}
                onPress={() => {}}
              >
                <Text>{nomeExibicao}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.inputFake}
                onPress={() => {}}
              >
                <Text>{emailExibicao}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FEEDBACK */}
          <View style={styles.imageCard}>
            <Image source={feedbackImg} style={styles.banner} />

            <View style={styles.overlay}>
              {!feedbackAtivo ? (
                <Pressable
                  onPress={() => setFeedbackAtivo(true)}
                  style={styles.inputFake}
                >
                  <Text>
                    {feedback || "Toque aqui para escrever"}
                  </Text>
                </Pressable>
              ) : (
                <TextInput
                  value={feedback}
                  onChangeText={setFeedback}
                  style={styles.inputReal}
                  multiline
                />
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  await enviarFeedback({ mensagem: feedback });
                  setFeedback("");
                  setFeedbackAtivo(false);
                }}
              >
                <Text style={{ color: "#fff" }}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL SHARE */}
      <Modal visible={shareModalVisible} transparent animationType="fade">
        <Pressable
          style={styles.modalBg}
          onPress={() => setShareModalVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.title}>Compartilhar</Text>

            <TouchableOpacity onPress={compartilharWhatsapp}>
              <Text>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={compartilharNativo}>
              <Text>Outros</Text>
            </TouchableOpacity>

          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imageCard: {
    marginVertical: 12,
  },

  banner: {
    width: "100%",
    height: 200,
  },

  overlay: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
  },

  inputFake: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  inputReal: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    height: 100,
  },

  button: {
    backgroundColor: "#2D9CDB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 250,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});