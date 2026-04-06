import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../src/contexts/themeContext";

import { usePerfil } from "../../hooks/usePerfil";
import { useCompartilhamento } from "../../hooks/useCompartilhamento";
import { useFotoPerfil } from "../../hooks/useFotoPerfil";

import { ProfilePhotoCard } from "../../src/features/perfil/components/ProfilePhotoCard";
import { DailyGoalCard } from "../../src/features/perfil/components/DailyGoalCard";
import { ProfileFormCard } from "../../src/features/perfil/components/ProfileFormCard";
import { FeedbackCard } from "../../src/features/perfil/components/FeedbackCard";
import { PasswordModal } from "../../src/features/perfil/components/PasswordModal";
import { ShareOptionsModal } from "../../src/features/perfil/components/ShareOptionsModal";

export default function PerfilScreen() {
  const router = useRouter();
  const { theme } = useTheme();

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

  const onSalvarNovaSenha = async () => {
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
        edges={["top", "left", "right"]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
      edges={["top", "left", "right"]}
    >
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
            style={[
              styles.imageCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={irParaMedalhas}
            activeOpacity={0.9}
          >
            <View style={styles.fullImageWrap}>
              <ImageBackground
                source={require("../../src/assets/images/brincaLibrasTCC/medalhas.png")}
                style={styles.fullImage}
                imageStyle={styles.fullImageInner}
                resizeMode="cover"
              >
                <View
                  style={[
                    styles.imageOverlay,
                    {
                      backgroundColor:
                        theme.mode === "dark" ? theme.overlay : "transparent",
                    },
                  ]}
                />
              </ImageBackground>
            </View>
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
            style={[
              styles.imageOnlyCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={abrirOpcoesCompartilhamento}
            activeOpacity={0.9}
          >
            <ImageBackground
              source={require("../../src/assets/images/brincaLibrasTCC/compartilhe-app.png")}
              style={styles.fullBleedImage}
              imageStyle={styles.fullBleedImageInner}
              resizeMode="cover"
            >
              <View
                style={[
                  styles.imageOverlay,
                  {
                    backgroundColor:
                      theme.mode === "dark" ? theme.overlay : "transparent",
                  },
                ]}
              />
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: theme.danger }]}
            onPress={onDeleteAccount}
            activeOpacity={0.85}
          >
            <Text
              style={[styles.deleteButtonIcon, { color: theme.textOnDanger }]}
            >
              🗑
            </Text>
            <Text
              style={[styles.deleteButtonText, { color: theme.textOnDanger }]}
            >
              Deletar conta
            </Text>
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
        onSave={onSalvarNovaSenha}
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

  imageCard: {
    borderRadius: 18,
    paddingTop: 10,
    paddingBottom: 16,
    marginBottom: 20,
    elevation: 3,
  },

  imageOnlyCard: {
    borderRadius: 18,
    borderWidth: 0,
    marginBottom: 20,
    overflow: "hidden",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    marginLeft: 8,
  },

  fullImageWrap: {
    width: "100%",
    height: 310,
    paddingHorizontal: 0,
  },

  fullImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },

  fullImageInner: {
    borderRadius: 16,
  },

  fullBleedImage: {
    width: "100%",
    height: 190,
  },

  fullBleedImageInner: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
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
    marginRight: 8,
  },

  deleteButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },
});
