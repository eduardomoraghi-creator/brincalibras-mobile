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

type ThemeType = typeof LIGHT;

export default function PerfilScreen() {
  const router = useRouter();
  const navTheme = useTheme();
  const isDark = navTheme.dark;
  const theme: ThemeType = isDark ? DARK : LIGHT;

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
  const [fotoUsuario, setFotoUsuario] = useState<string | null>(null);

  const [modalNomeVisible, setModalNomeVisible] = useState(false);
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalSenhaVisible, setModalSenhaVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  const [nomeTemp, setNomeTemp] = useState("");
  const [emailTemp, setEmailTemp] = useState("");
  const [senhaTemp, setSenhaTemp] = useState("");
  const [confirmarSenhaTemp, setConfirmarSenhaTemp] = useState("");

  const [feedbackAtivo, setFeedbackAtivo] = useState(false);

  const progress = 0.82;

  const nomeExibicao = nome?.trim() || usuario?.nome || "Seu nome aqui";
  const emailExibicao = email?.trim() || usuario?.email || "seuemail@aqui.com";

  const mensagemCompartilhamento = useMemo(
    () =>
      "Venha aprender Libras comigo no BrincaLibras! Aprender junto com os amigos é muito mais divertido!",
    [],
  );

  const onDetalhesPress = () => {
    Alert.alert("Meta diária", "Abrir progresso detalhado.");
  };

  const abrirCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à câmera para tirar sua foto.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.length > 0) {
      setFotoUsuario(result.assets[0].uri);
    }
  };

  const abrirGaleria = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à galeria para escolher sua foto.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.length > 0) {
      setFotoUsuario(result.assets[0].uri);
    }
  };

  const removerFoto = () => {
    setFotoUsuario(null);
  };

  const onFotoUsuarioPress = () => {
    Alert.alert("Foto do usuário", "Escolha uma opção:", [
      { text: "Tirar foto", onPress: abrirCamera },
      { text: "Escolher da galeria", onPress: abrirGaleria },
      ...(fotoUsuario
        ? [
            {
              text: "Remover foto",
              onPress: removerFoto,
              style: "destructive" as const,
            },
          ]
        : []),
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const onOpenEditarNome = () => {
    setNomeTemp(nomeExibicao === "Seu nome aqui" ? "" : nomeExibicao);
    setModalNomeVisible(true);
  };

  const onSalvarNome = async () => {
    const valor = nomeTemp.trim();

    if (!valor) {
      Alert.alert("Nome", "Digite um nome válido.");
      return;
    }

    try {
      await salvarPerfil({ nome: valor });
      setModalNomeVisible(false);
      Alert.alert("Nome", "Nome atualizado com sucesso.");
    } catch (e) {
      Alert.alert(
        "Nome",
        e instanceof Error ? e.message : "Não foi possível atualizar o nome.",
      );
    }
  };

  const onOpenEditarEmail = () => {
    setEmailTemp(emailExibicao === "seuemail@aqui.com" ? "" : emailExibicao);
    setModalEmailVisible(true);
  };

  const onSalvarEmail = async () => {
    const valor = emailTemp.trim();

    if (!valor || !valor.includes("@")) {
      Alert.alert("E-mail", "Digite um e-mail válido.");
      return;
    }

    try {
      await salvarPerfil({ email: valor });
      setModalEmailVisible(false);
      Alert.alert("E-mail", "E-mail atualizado com sucesso.");
    } catch (e) {
      Alert.alert(
        "E-mail",
        e instanceof Error ? e.message : "Não foi possível atualizar o e-mail.",
      );
    }
  };

  const onOpenAlterarSenha = () => {
    setSenhaTemp("");
    setConfirmarSenhaTemp("");
    setModalSenhaVisible(true);
  };

  const onSalvarSenha = async () => {
    if (!senhaTemp || !confirmarSenhaTemp) {
      Alert.alert("Senha", "Preencha os dois campos.");
      return;
    }

    if (senhaTemp.length < 6) {
      Alert.alert("Senha", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (senhaTemp !== confirmarSenhaTemp) {
      Alert.alert("Senha", "As senhas não coincidem.");
      return;
    }

    try {
      await salvarSenha(senhaTemp);
      setModalSenhaVisible(false);
      Alert.alert("Senha", "Senha alterada com sucesso.");
    } catch (e) {
      Alert.alert(
        "Senha",
        e instanceof Error ? e.message : "Não foi possível alterar a senha.",
      );
    }
  };

  const onEnviarFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert("Feedback", "Digite uma mensagem antes de enviar.");
      return;
    }

    try {
      await enviarFeedback({ mensagem: feedback });
      Alert.alert("Feedback", "Feedback enviado com sucesso.");
      setFeedback("");
      setFeedbackAtivo(false);
    } catch (e) {
      Alert.alert(
        "Feedback",
        e instanceof Error ? e.message : "Erro ao enviar feedback.",
      );
    }
  };

  const onDeleteAccount = () => {
    Alert.alert("Deletar conta", "Tem certeza que deseja deletar sua conta?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Deletar", style: "destructive" },
    ]);
  };

  const compartilharNativo = async () => {
    try {
      await Share.share({
        message: mensagemCompartilhamento,
      });
    } catch (error) {
      console.log("Erro ao compartilhar:", error);
    }
  };

  const compartilharWhatsapp = async () => {
    try {
      const url = `whatsapp://send?text=${encodeURIComponent(
        mensagemCompartilhamento,
      )}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch {
      await compartilharNativo();
    }
  };

  const compartilharEmail = async () => {
    try {
      const subject = "Convite para conhecer o BrincaLibras";
      const body = mensagemCompartilhamento;
      const url = `mailto:?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch {
      await compartilharNativo();
    }
  };

  const compartilharSms = async () => {
    try {
      const separator = Platform.OS === "ios" ? "&" : "?";
      const url = `sms:${separator}body=${encodeURIComponent(
        mensagemCompartilhamento,
      )}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch {
      await compartilharNativo();
    }
  };

  const compartilharLinkedin = async () => {
    try {
      const texto = encodeURIComponent(mensagemCompartilhamento);
      const webUrl = `https://www.linkedin.com/sharing/share-offsite/?summary=${texto}`;
      const webSupported = await Linking.canOpenURL(webUrl);

      if (webSupported) {
        await Linking.openURL(webUrl);
      } else {
        await compartilharNativo();
      }
    } catch {
      await compartilharNativo();
    }
  };

  const abrirOpcoesCompartilhamento = () => {
    setShareModalVisible(true);
  };

  const fecharOpcoesCompartilhamento = () => {
    setShareModalVisible(false);
  };

  const onCompartilharWhatsapp = async () => {
    fecharOpcoesCompartilhamento();
    await compartilharWhatsapp();
  };

  const onCompartilharEmail = async () => {
    fecharOpcoesCompartilhamento();
    await compartilharEmail();
  };

  const onCompartilharSms = async () => {
    fecharOpcoesCompartilhamento();
    await compartilharSms();
  };

  const onCompartilharLinkedin = async () => {
    fecharOpcoesCompartilhamento();
    await compartilharLinkedin();
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
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
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
          <View style={styles.imageCard}>
            <Image
              source={fotoUsuario ? { uri: fotoUsuario } : fotoUsuarioImg}
              style={styles.avatarImage}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.fotoUsuarioOverlayButton}
              onPress={onFotoUsuarioPress}
              activeOpacity={0.85}
            />
          </View>

          <View
            style={[
              styles.metaCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.metaHeaderRow}>
              <View style={styles.metaTitleRow}>
                <Text style={styles.metaIcon}>🚀</Text>
                <Text style={[styles.metaTitle, { color: theme.text }]}>
                  Meta diária
                </Text>
              </View>

              <TouchableOpacity
                onPress={abrirOpcoesCompartilhamento}
                activeOpacity={0.8}
                style={styles.shareCircleButton}
              >
                <Ionicons
                  name="share-social"
                  size={20}
                  color={theme.primary}
                />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.progressBarTrack,
                {
                  borderColor: theme.primary,
                  backgroundColor: theme.progressBg,
                },
              ]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${progress * 100}%`,
                    backgroundColor: theme.primary,
                  },
                ]}
              />
            </View>

            <TouchableOpacity
              style={[styles.metaButton, { backgroundColor: theme.darkButton }]}
              onPress={onDetalhesPress}
              activeOpacity={0.85}
            >
              <Text style={styles.metaButtonText}>
                Visualizar progresso detalhado
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageCard}>
            <Image
              source={medalhasImg}
              style={styles.bannerImage}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.medalhasOverlayButton}
              onPress={irParaMedalhas}
              activeOpacity={0.85}
            />
          </View>

          <View style={styles.imageCard}>
            <Image
              source={dadosCadastraisImg}
              style={styles.bannerImage}
              resizeMode="contain"
            />

            <View style={styles.dadosOverlayContainer}>
              <TouchableOpacity
                style={[
                  styles.solidFieldButton,
                  {
                    backgroundColor: theme.solidFieldBg,
                    borderColor: theme.solidFieldBorder,
                  },
                ]}
                onPress={onOpenEditarNome}
                activeOpacity={0.9}
              >
                <Text
                  style={[
                    styles.solidFieldText,
                    { color: theme.solidFieldText },
                  ]}
                  numberOfLines={1}
                >
                  {nomeExibicao}
                </Text>
                <Ionicons name="create-outline" size={18} color="#000000" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.solidFieldButton,
                  {
                    backgroundColor: theme.solidFieldBg,
                    borderColor: theme.solidFieldBorder,
                  },
                ]}
                onPress={onOpenEditarEmail}
                activeOpacity={0.9}
              >
                <Text
                  style={[
                    styles.solidFieldText,
                    { color: theme.solidFieldText },
                  ]}
                  numberOfLines={1}
                >
                  {emailExibicao}
                </Text>
                <Ionicons name="create-outline" size={18} color="#000000" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.passwordButton,
                  { backgroundColor: theme.darkButton },
                ]}
                onPress={onOpenAlterarSenha}
                activeOpacity={0.85}
              >
                <Text style={styles.passwordButtonText}>Alterar senha</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imageCard}>
            <Image
              source={feedbackImg}
              style={styles.bannerImage}
              resizeMode="contain"
            />

            <View style={styles.feedbackOverlayContainer}>
              {!feedbackAtivo ? (
                <Pressable
                  onPress={() => setFeedbackAtivo(true)}
                  style={[
                    styles.feedbackInactiveBox,
                    {
                      backgroundColor: theme.solidFieldBg,
                      borderColor: theme.solidFieldBorder,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.feedbackInactiveText,
                      { color: "#000000" },
                    ]}
                  >
                    {feedback.trim()
                      ? feedback
                      : "Toque aqui para escrever seu feedback"}
                  </Text>
                </Pressable>
              ) : (
                <TextInput
                  multiline
                  value={feedback}
                  onChangeText={setFeedback}
                  placeholder="Digite aqui o feedback do usuário"
                  placeholderTextColor={theme.inputPlaceholder}
                  style={[
                    styles.feedbackOverlayInput,
                    {
                      color: "#000000",
                      backgroundColor: theme.solidFieldBg,
                      borderColor: theme.solidFieldBorder,
                    },
                  ]}
                  textAlignVertical="top"
                />
              )}

              <TouchableOpacity
                style={[
                  styles.feedbackSendButton,
                  { backgroundColor: theme.primary },
                ]}
                onPress={onEnviarFeedback}
                activeOpacity={0.85}
              >
                <Text style={styles.feedbackSendButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imageCard}>
            <Image
              source={compartilharImg}
              style={styles.bannerImage}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.compartilharOverlayButton}
              onPress={abrirOpcoesCompartilhamento}
              activeOpacity={0.85}
            />
          </View>

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

      <EditModal
        visible={modalNomeVisible}
        title="Editar nome"
        value={nomeTemp}
        onChangeText={setNomeTemp}
        onClose={() => setModalNomeVisible(false)}
        onSave={onSalvarNome}
        theme={theme}
        placeholder="Digite seu nome"
      />

      <EditModal
        visible={modalEmailVisible}
        title="Editar e-mail"
        value={emailTemp}
        onChangeText={setEmailTemp}
        onClose={() => setModalEmailVisible(false)}
        onSave={onSalvarEmail}
        theme={theme}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />

      <PasswordModal
        visible={modalSenhaVisible}
        senha={senhaTemp}
        confirmarSenha={confirmarSenhaTemp}
        onChangeSenha={setSenhaTemp}
        onChangeConfirmarSenha={setConfirmarSenhaTemp}
        onClose={() => setModalSenhaVisible(false)}
        onSave={onSalvarSenha}
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

type EditModalProps = {
  visible: boolean;
  title: string;
  value: string;
  onChangeText: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  theme: ThemeType;
  placeholder: string;
  keyboardType?: "default" | "email-address";
};

function EditModal({
  visible,
  title,
  value,
  onChangeText,
  onClose,
  onSave,
  theme,
  placeholder,
  keyboardType = "default",
}: EditModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            {title}
          </Text>

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.inputPlaceholder}
            keyboardType={keyboardType}
            style={[
              styles.modalInput,
              {
                backgroundColor: "#FFFFFF",
                color: "#000000",
                borderColor: theme.border,
              },
            ]}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#888888" }]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.primary }]}
              onPress={onSave}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

type PasswordModalProps = {
  visible: boolean;
  senha: string;
  confirmarSenha: string;
  onChangeSenha: (value: string) => void;
  onChangeConfirmarSenha: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  theme: ThemeType;
};

function PasswordModal({
  visible,
  senha,
  confirmarSenha,
  onChangeSenha,
  onChangeConfirmarSenha,
  onClose,
  onSave,
  theme,
}: PasswordModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            Alterar senha
          </Text>

          <TextInput
            value={senha}
            onChangeText={onChangeSenha}
            placeholder="Nova senha"
            placeholderTextColor={theme.inputPlaceholder}
            secureTextEntry
            style={[
              styles.modalInput,
              {
                backgroundColor: "#FFFFFF",
                color: "#000000",
                borderColor: theme.border,
              },
            ]}
          />

          <TextInput
            value={confirmarSenha}
            onChangeText={onChangeConfirmarSenha}
            placeholder="Confirmar senha"
            placeholderTextColor={theme.inputPlaceholder}
            secureTextEntry
            style={[
              styles.modalInput,
              {
                backgroundColor: "#FFFFFF",
                color: "#000000",
                borderColor: theme.border,
              },
            ]}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#888888" }]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.primary }]}
              onPress={onSave}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

type ShareOptionsModalProps = {
  visible: boolean;
  onClose: () => void;
  onWhatsapp: () => void | Promise<void>;
  onEmail: () => void | Promise<void>;
  onSms: () => void | Promise<void>;
  onLinkedin: () => void | Promise<void>;
};

function ShareOptionsModal({
  visible,
  onClose,
  onWhatsapp,
  onEmail,
  onSms,
  onLinkedin,
}: ShareOptionsModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.shareModalBackdrop} onPress={onClose}>
        <Pressable style={styles.shareModalCenter} onPress={() => {}}>
          <View style={styles.shareModalCard}>
            <Text style={styles.shareModalTitle}>Compartilhar convite</Text>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={onWhatsapp}
              activeOpacity={0.85}
            >
              <Text style={styles.shareOptionText}>WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={onEmail}
              activeOpacity={0.85}
            >
              <Text style={styles.shareOptionText}>E-mail</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={onSms}
              activeOpacity={0.85}
            >
              <Text style={styles.shareOptionText}>SMS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.shareOptionButton}
              onPress={onLinkedin}
              activeOpacity={0.85}
            >
              <Text style={styles.shareOptionText}>LinkedIn</Text>
            </TouchableOpacity>

          </View>
        </Pressable>
      </Pressable>
    </Modal>
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
    width: "100%",
    position: "relative",
    marginBottom: 20,
  },

  avatarImage: {
    width: 124,
    height: 124,
    alignSelf: "center",
    borderRadius: 62,
    overflow: "hidden",
  },

  bannerImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.22,
  },

  fotoUsuarioOverlayButton: {
    position: "absolute",
    alignSelf: "center",
    top: "4%",
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: "transparent",
  },

  metaCard: {
    borderRadius: 16,
    borderWidth: 1.2,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 16,
    marginBottom: 20,
  },

  metaHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  metaTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  metaIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  metaTitle: {
    fontSize: 16,
    fontWeight: "800",
  },

  shareCircleButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  progressBarTrack: {
    height: 16,
    borderRadius: 999,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 18,
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 999,
  },

  metaButton: {
    minHeight: 40,
    alignSelf: "center",
    borderRadius: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },

  metaButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  medalhasOverlayButton: {
    position: "absolute",
    left: "20%",
    right: "20%",
    bottom: "5%",
    height: "19%",
    backgroundColor: "transparent",
  },

  dadosOverlayContainer: {
    position: "absolute",
    left: "24%",
    right: "6%",
    top: "18%",
    bottom: "8%",
    justifyContent: "space-between",
  },

  solidFieldButton: {
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  solidFieldText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 10,
  },

  passwordButton: {
    minHeight: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  passwordButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  feedbackOverlayContainer: {
    position: "absolute",
    left: "7%",
    right: "7%",
    top: "24%",
    bottom: "8%",
    justifyContent: "space-between",
  },

  feedbackInactiveBox: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
  },

  feedbackInactiveText: {
    fontSize: 14,
    fontWeight: "600",
  },

  feedbackOverlayInput: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: "600",
  },

  feedbackSendButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    minWidth: 110,
    minHeight: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  feedbackSendButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  compartilharOverlayButton: {
    position: "absolute",
    right: "3%",
    bottom: "5%",
    width: "33%",
    height: "23%",
    backgroundColor: "transparent",
  },

  deleteButton: {
    width: "75%",
    alignSelf: "center",
    minHeight: 38,
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

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  modalCard: {
    borderRadius: 18,
    padding: 18,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 14,
  },

  modalInput: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 6,
  },

  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 10,
  },

  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
  },

  shareModalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  shareModalCenter: {
    width: "100%",
    alignItems: "center",
  },

  shareModalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  shareModalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 14,
    textAlign: "center",
  },

  shareOptionButton: {
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 16,
  },

  shareOptionText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
  },

  shareCancelButton: {
    backgroundColor: "#E9E9E9",
  },

  shareCancelText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#000000",
  },
});