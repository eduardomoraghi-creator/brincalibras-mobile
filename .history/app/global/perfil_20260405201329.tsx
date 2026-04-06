import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { usePerfil } from "../../hooks/usePerfil";
import { useCompartilhamento } from "../../hooks/useCompartilhamento";
import { useFotoPerfil } from "../../hooks/useFotoPerfil";

import { ProfilePhotoCard } from "../../src/features/perfil/components/ProfilePhotoCard";
import { DailyGoalCard } from "../../src/features/perfil/components/DailyGoalCard";
import { ProfileFormCard } from "../../src/features/perfil/components/ProfileFormCard";
import { FeedbackCard } from "../../src/features/perfil/components/FeedbackCard";
import { PasswordModal } from "../../src/features/perfil/components/PasswordModal";
import { ShareOptionsModal } from "../../src/features/perfil/components/ShareOptionsModal";

const LIGHT = {
  primary: "#2D9CDB",
  background: "#EDEDED",
  card: "#F5F5F5",
  border: "#3EA0DD",
  darkButton: "#666666",
  danger: "#F20D0D",
  text: "#111111",
  muted: "#7A7A7A",
};

const DARK = {
  primary: "#2D9CDB",
  background: "#111418",
  card: "#1C2229",
  border: "#3EA0DD",
  darkButton: "#5A5F66",
  danger: "#D81E1E",
  text: "#F4F4F4",
  muted: "#B3BDC8",
};

export default function PerfilScreen() {
  const router = useRouter();
  const navTheme = useTheme();
  const theme = navTheme.dark ? DARK : LIGHT;

  const {
    usuario,
    nome,
    setNome,
    email,
    setEmail,
    feedback,
    setFeedback,
    feedbackErro,
    loading,
    erro,
    mensagens,
    erroGeral,
    validarESalvarPerfil,
    salvarSenha,
    enviarFeedback,
    focusAnimNome,
    focusAnimEmail,
    focusAnimSenha,
    focusAnimConfirmarSenha,
    errorAnim,
    animateFocus,
    resetarErro,
  } = usePerfil();

  const {
    shareModalVisible,
    abrirOpcoesCompartilhamento,
    fecharOpcoesCompartilhamento,
    onCompartilharWhatsapp,
    onCompartilharEmail,
    onCompartilharSms,
    onCompartilharLinkedin,
  } = useCompartilhamento();

  const { fotoUsuario, onFotoUsuarioPress } = useFotoPerfil();

  const [modalSenhaVisible, setModalSenhaVisible] = React.useState(false);
  const [senhaTemp, setSenhaTemp] = React.useState("");
  const [confirmarSenhaTemp, setConfirmarSenhaTemp] = React.useState("");

  const irParaMedalhas = () => router.push("/global/medalhas");

  if (loading && !usuario) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <ProfilePhotoCard
            theme={theme}
            fotoUsuario={fotoUsuario}
            onPress={onFotoUsuarioPress}
          />

          <DailyGoalCard
            theme={theme}
            progress={0.82}
            onDetalhesPress={() => {}}
            onCompartilharPress={abrirOpcoesCompartilhamento}
          />

          {/* MEDALHAS */}
          <TouchableOpacity
            style={[styles.card, { borderColor: theme.border }]}
            onPress={irParaMedalhas}
          >
            <ImageBackground
              source={require("../../src/assets/images/brincaLibrasTCC/medalhas.png")}
              style={styles.fullImage}
              resizeMode="cover"
            >
              <Text style={styles.overlayText}>Ver mais</Text>
            </ImageBackground>
          </TouchableOpacity>

          <ProfileFormCard
            theme={theme}
            nome={nome}
            setNome={setNome}
            email={email}
            setEmail={setEmail}
            erro={erro}
            mensagens={mensagens}
            erroGeral={erroGeral}
            focusAnimNome={focusAnimNome}
            focusAnimEmail={focusAnimEmail}
            errorAnim={errorAnim}
            animateFocus={animateFocus}
            onSalvarPerfil={validarESalvarPerfil}
            onAlterarSenha={() => setModalSenhaVisible(true)}
            loading={loading}
          />

          <FeedbackCard
            theme={theme}
            feedback={feedback}
            setFeedback={setFeedback}
            feedbackErro={feedbackErro}
            onEnviarFeedback={enviarFeedback}
            loading={loading}
          />

          {/* COMPARTILHAR */}
          <TouchableOpacity
            style={[styles.card, { borderColor: theme.border }]}
            onPress={abrirOpcoesCompartilhamento}
          >
            <Image
              source={require("../../src/assets/images/brincaLibrasTCC/compartilhe-app.png")}
              style={styles.fullImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.deleteButton, { backgroundColor: theme.danger }]}>
            <Text style={{ color: "#fff" }}>Deletar conta</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      <PasswordModal
        visible={modalSenhaVisible}
        senha={senhaTemp}
        confirmarSenha={confirmarSenhaTemp}
        onChangeSenha={setSenhaTemp}
        onChangeConfirmarSenha={setConfirmarSenhaTemp}
        onClose={() => setModalSenhaVisible(false)}
        onSave={() => {}}
        theme={theme}
      />

      <ShareOptionsModal
        visible={shareModalVisible}
        onClose={fecharOpcoesCompartilhamento}
        onWhatsapp={onCompartilharWhatsapp}
        onEmail={onCompartilharEmail}
        onSms={onCompartilharSms}
        onLinkedin={onCompartilharLinkedin}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  scrollContent: {
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },

  fullImage: {
    width: "100%",
    height: 180,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  overlayText: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },

  deleteButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
});