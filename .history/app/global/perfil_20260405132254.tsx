import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Share,
  Linking,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePerfil } from "../../hooks/usePerfil";

const medalhasImg = require("../../assets/images/perfil/medalhas.png");
const compartilheAppImg = require("../../assets/images/perfil/compartilhe-app.png");

export default function PerfilScreen() {
  const router = useRouter();
  const { usuario, nome, email, loading, erro, salvar } = usePerfil();

  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const theme = stylesLight;

  useEffect(() => {
    setSenha("");
    setConfirmaSenha("");
  }, [usuario]);

  const validarESalvar = async () => {
    setErroSenha("");

    if (!senha || !confirmaSenha) {
      setErroSenha("Todos os campos de senha são obrigatórios");
      return;
    }

    if (senha.length < 6) {
      setErroSenha("Senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (senha !== confirmaSenha) {
      setErroSenha("Senhas não coincidem");
      return;
    }

    await salvar(senha);
    setSenha("");
    setConfirmaSenha("");
  };

  const sair = async () => {
    try {
      await AsyncStorage.clear();
      router.replace("/login");
    } catch (e) {
      console.log("Erro ao sair:", e);
    }
  };

  const mensagemCompartilhamento =
    "Venha aprender Libras comigo no BrincaLibras! Aprender junto com os amigos é muito mais divertido!";

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
        mensagemCompartilhamento
      )}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch (error) {
      console.log("Erro ao compartilhar no WhatsApp:", error);
      await compartilharNativo();
    }
  };

  const compartilharEmail = async () => {
    try {
      const subject = "Convite para conhecer o BrincaLibras";
      const body = mensagemCompartilhamento;

      const url = `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch (error) {
      console.log("Erro ao compartilhar por e-mail:", error);
      await compartilharNativo();
    }
  };

  const compartilharSms = async () => {
    try {
      const separator = Platform.OS === "ios" ? "&" : "?";
      const url = `sms:${separator}body=${encodeURIComponent(
        mensagemCompartilhamento
      )}`;

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch (error) {
      console.log("Erro ao compartilhar por SMS:", error);
      await compartilharNativo();
    }
  };

  const compartilharTelegram = async () => {
    try {
      const url = `tg://msg?text=${encodeURIComponent(mensagemCompartilhamento)}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        await compartilharNativo();
      }
    } catch (error) {
      console.log("Erro ao compartilhar no Telegram:", error);
      await compartilharNativo();
    }
  };

  const abrirOpcoesCompartilhamento = () => {
    Alert.alert("Compartilhar convite", "Escolha uma das 4 opções:", [
      { text: "WhatsApp", onPress: compartilharWhatsapp },
      { text: "E-mail", onPress: compartilharEmail },
      { text: "SMS", onPress: compartilharSms },
      { text: "Telegram", onPress: compartilharTelegram },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const irParaMedalhas = () => {
    router.push("/global/medalhas");
  };

  const InputField = ({
    label,
    value,
    placeholder,
    secure = false,
    onChangeText,
  }: {
    label: string;
    value: string;
    placeholder: string;
    secure?: boolean;
    onChangeText: (text: string) => void;
  }) => (
    <>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        placeholderTextColor="#888"
        style={[
          styles.input,
          { backgroundColor: theme.inputBackground, color: theme.text },
        ]}
      />
    </>
  );

  if (loading && !usuario) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {erro && <Text style={styles.error}>{erro}</Text>}

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Dados do perfil</Text>

            <View style={styles.linha}>
              <Text style={[styles.labelHorizontal, { color: theme.text }]}>
                Nome:
              </Text>
              <Text
                style={[styles.valorHorizontal, { color: theme.text }]}
                numberOfLines={2}
              >
                {nome}
              </Text>
            </View>

            <View style={styles.linha}>
              <Text style={[styles.labelHorizontal, { color: theme.text }]}>
                E-mail:
              </Text>
              <Text
                style={[styles.valorHorizontal, { color: theme.text }]}
                numberOfLines={2}
              >
                {email}
              </Text>
            </View>

            <InputField
              label="Nova senha"
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite a nova senha"
              secure
            />

            <InputField
              label="Confirmar senha"
              value={confirmaSenha}
              onChangeText={setConfirmaSenha}
              placeholder="Confirme a nova senha"
              secure
            />

            {erroSenha ? <Text style={styles.error}>{erroSenha}</Text> : null}

            <TouchableOpacity
              onPress={validarESalvar}
              style={[styles.button, { backgroundColor: theme.button }]}
              activeOpacity={0.85}
            >
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                Salvar alterações
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={sair}
              style={[styles.button, styles.buttonDanger]}
              activeOpacity={0.85}
            >
              <Text style={[styles.buttonText, { color: "#FFF" }]}>Sair</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageCard}>
            <Image
              source={medalhasImg}
              style={styles.imageBanner}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.medalhasButtonOverlay}
              onPress={irParaMedalhas}
              activeOpacity={0.15}
            >
              <View />
            </TouchableOpacity>
          </View>

          <View style={styles.imageCard}>
            <Image
              source={compartilheAppImg}
              style={styles.imageBanner}
              resizeMode="contain"
            />

            <TouchableOpacity
              style={styles.compartilharButtonOverlay}
              onPress={abrirOpcoesCompartilhamento}
              activeOpacity={0.15}
            >
              <View />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },

  content: {
    gap: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D8D8D8",
    padding: 18,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 20,
  },

  label: {
    marginBottom: 6,
    fontWeight: "600",
    fontSize: 15,
  },

  linha: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  labelHorizontal: {
    fontSize: 18,
    fontWeight: "bold",
    width: 90,
  },

  valorHorizontal: {
    flex: 1,
    fontSize: 18,
  },

  input: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 18,
    fontSize: 16,
  },

  button: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
  },

  buttonDanger: {
    backgroundColor: "#E53935",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    color: "#D32F2F",
    marginBottom: 10,
    fontSize: 14,
  },

  imageCard: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },

  imageBanner: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.9,
  },

  medalhasButtonOverlay: {
    position: "absolute",
    left: "22%",
    right: "22%",
    bottom: "5%",
    height: "20%",
    backgroundColor: "transparent",
  },

  compartilharButtonOverlay: {
    position: "absolute",
    right: "4%",
    bottom: "5%",
    width: "34%",
    height: "24%",
    backgroundColor: "transparent",
  },
});

const stylesLight = {
  background: "#FFFFFF",
  text: "#000000",
  inputBackground: "#EEEEEE",
  button: "#5C5C5C",
  buttonText: "#FFFFFF",
  primary: "#2A9DF4",
};