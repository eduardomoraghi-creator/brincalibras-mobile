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

  const irParaMedalhas = () => {
    router.push("/global/medalhas");
  };

  if (loading && !usuario) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={{ padding: 22 }}>

          {/* FOTO */}
          <ProfilePhotoCard theme={theme} fotoUsuario={fotoUsuario} onPress={onFotoUsuarioPress} />

          {/* META */}
          <DailyGoalCard
            theme={theme}
            progress={0.82}
            onDetalhesPress={() => Alert.alert("Meta diária")}
            onCompartilharPress={abrirOpcoesCompartilhamento}
          />

          {/* MEDALHAS */}
          <TouchableOpacity
            style={{
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              borderWidth: 1,
              borderRadius: 18,
              marginBottom: 20,
            }}
            onPress={irParaMedalhas}
          >
            <View style={{ flexDirection: "row", padding: 14 }}>
              <Ionicons name="ribbon" size={18} color={theme.primary} />
              <Text style={{ color: theme.text, marginLeft: 8 }}>
                Medalhas
              </Text>
            </View>

            <ImageBackground
              source={require("../../src/assets/images/brincaLibrasTCC/medalhas.png")}
              style={{ height: 180, justifyContent: "flex-end" }}
            >
              {/* overlay melhora contraste */}
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: theme.overlay,
                }}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: theme.secondaryButton,
                  padding: 10,
                  borderRadius: 12,
                  alignSelf: "center",
                  marginBottom: 10,
                }}
              >
                {/* TEXTO SEMPRE LEGÍVEL */}
                <Text style={{ color: theme.secondaryButtonText }}>
                  Ver mais
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>

          {/* FORM */}
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

          {/* FEEDBACK */}
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
            style={{
              backgroundColor: theme.card,
              borderColor: theme.cardBorder,
              borderWidth: 1,
              borderRadius: 18,
              overflow: "hidden",
              marginBottom: 20,
            }}
            onPress={abrirOpcoesCompartilhamento}
          >
            <ImageBackground
              source={require("../../src/assets/images/brincaLibrasTCC/compartilhe-app.png")}
              style={{ height: 160 }}
            >
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: theme.mode === "dark" ? theme.overlay : "transparent",
                }}
              />
            </ImageBackground>
          </TouchableOpacity>

          {/* DELETE */}
          <TouchableOpacity
            style={{
              backgroundColor: theme.danger,
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={() => Alert.alert("Deletar conta")}
          >
            <Text style={{ color: theme.textOnDanger, marginRight: 8 }}>
              🗑
            </Text>

            {/* TEXTO CORRETO PARA FUNDO ESCURO */}
            <Text style={{ color: theme.textOnDanger }}>
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
        onSave={salvarSenha}
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