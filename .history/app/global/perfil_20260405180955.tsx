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
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";

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
  inputText: "#000000",
  inputPlaceholder: "#7E7E7E",
  progressBg: "#F0F0F0",
  solidFieldBg: "#FFFFFF",
  solidFieldBorder: "#D6D6D6",
  solidFieldText: "#000000",
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
  inputText: "#000000",
  inputPlaceholder: "#7E7E7E",
  progressBg: "#2B333D",
  solidFieldBg: "#FFFFFF",
  solidFieldBorder: "#D6D6D6",
  solidFieldText: "#000000",
};

export type PerfilTheme = typeof LIGHT;

export default function PerfilScreen() {
  const router = useRouter();
  const navTheme = useTheme();
  const theme: PerfilTheme = navTheme.dark ? DARK : LIGHT;

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

  const {
    fotoUsuario,
    onFotoUsuarioPress,
  } = useFotoPerfil();

  const [modalSenhaVisible, setModalSenhaVisible] = React.useState(false);
  const [senhaTemp, setSenhaTemp] = React.useState("");
  const [confirmarSenhaTemp, setConfirmarSenhaTemp] = React.useState("");

  const onDetalhesPress = () => {
    Alert.alert("Meta diária", "Abrir progresso detalhado.");
  };

  const onSalvarPerfil = async () => {
    const resultado = await validarESalvarPerfil();

    if (resultado.sucesso) {
      Alert.alert("Perfil", "Dados cadastrais atualizados com sucesso.");
    }
  };

  const onOpenAlterarSenha = () => {
    setSenhaTemp("");
    setConfirmarSenhaTemp("");
    resetarErro();
    setModalSenhaVisible(true);
  };

  const onSalvarSenha = async () => {
    const resultado = await salvarSenha(senhaTemp, confirmarSenhaTemp);

    if (resultado.sucesso) {
      setModalSenhaVisible(false);
      setSenhaTemp("");
      setConfirmarSenhaTemp("");
      Alert.alert("Senha", "Senha alterada com sucesso.");
    }
  };

  const onEnviarFeedback = async () => {
    const resultado = await enviarFeedback();

    if (resultado.sucesso) {
      Alert.alert("Feedback", "Feedback enviado com sucesso.");
    }
  };

  const onDeleteAccount = () => {
    Alert.alert("Deletar conta", "Tem certeza que deseja deletar sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Deletar", style: "destructive" },
    ]);
  };

  const irParaMedalhas = () => {
    router.push("/global/medalhas");
  };

  if (loading && !usuario) {
    return (
      <SafeAreaView
        style={[styles.loadingContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ProfilePhotoCard
            theme={theme}
            fotoUsuario={fotoUsuario}
            onPress={onFotoUsuarioPress}
          />

          <DailyGoalCard
            theme={theme}
            progress={0.82}
            onDetalhesPress={onDetalhesPress}
            onCompartilharPress={abrirOpcoesCompartilhamento}
          />

          <TouchableOpacity
            style={[styles.medalhasCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={irParaMedalhas}
            activeOpacity={0.9}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>Medalhas</Text>
            <Text style={[styles.cardSubtitle, { color: theme.muted }]}>
              Veja seu progresso por categorias e atividades.
            </Text>
            <Text style={[styles.cardLink, { color: theme.primary }]}>Abrir medalhas</Text>
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
            onSalvarPerfil={onSalvarPerfil}
            onAlterarSenha={onOpenAlterarSenha}
            loading={loading}
          />

          <FeedbackCard
            theme={theme}
            feedback={feedback}
            setFeedback={setFeedback}
            feedbackErro={feedbackErro}
            onEnviarFeedback={onEnviarFeedback}
            loading={loading}
          />

          <TouchableOpacity
            style={[styles.compartilharCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={abrirOpcoesCompartilhamento}
            activeOpacity={0.9}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>Compartilhar app</Text>
            <Text style={[styles.cardSubtitle, { color: theme.muted }]}>
              Convide outras pessoas para conhecer o BrincaLibras.
            </Text>
            <Text style={[styles.cardLink, { color: theme.primary }]}>Escolher opção de compartilhamento</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: theme.danger }]}
            onPress={onDeleteAccount}
            activeOpacity={0.85}
          >
            <Text style={styles.deleteButtonIcon}>🗑</Text>
            <Text style={styles.deleteButtonText}>Deletar conta</Text>
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
        onSave={onSalvarSenha}
        theme={theme}
        erro={erro}
        mensagens={mensagens}
        focusAnimSenha={focusAnimSenha}
        focusAnimConfirmarSenha={focusAnimConfirmarSenha}
        errorAnim={errorAnim}
        animateFocus={animateFocus}
        loading={loading}
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
  safeArea: {
    flex: 1,
  },

  keyboardContainer: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 24,
  },

  medalhasCard: {
    borderRadius: 18,
    borderWidth: 1.2,
    padding: 18,
    marginBottom: 20,
  },

  compartilharCard: {
    borderRadius: 18,
    borderWidth: 1.2,
    padding: 18,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },

  cardSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },

  cardLink: {
    fontSize: 14,
    fontWeight: "800",
  },

  deleteButton: {
    width: "75%",
    alignSelf: "center",
    minHeight: 42,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10,
  },

  deleteButtonIcon: {
    fontSize: 18,
    color: "#FFFFFF",
    marginRight: 8,
  },

  deleteButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "800",
  },
});