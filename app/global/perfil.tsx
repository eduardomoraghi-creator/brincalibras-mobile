// app/global/perfil.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePerfil } from "../../hooks/usePerfil";

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
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
        {erro && <Text style={styles.error}>{erro}</Text>}

        <View style={styles.content}>
          {/* Nome */}
          <View style={styles.linha}>
            <Text style={[styles.labelHorizontal, { color: theme.text }]}>
              Nome:
            </Text>
            <Text style={[styles.valorHorizontal, { color: theme.text }]}>
              {nome}
            </Text>
          </View>

          {/* Email */}
          <View style={styles.linha}>
            <Text style={[styles.labelHorizontal, { color: theme.text }]}>
              E-mail:
            </Text>
            <Text style={[styles.valorHorizontal, { color: theme.text }]}>
              {email}
            </Text>
          </View>

          {/* Senha */}
          <InputField
            label="Nova Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite a nova senha"
            secure
          />

          <InputField
            label="Confirmar Senha"
            value={confirmaSenha}
            onChangeText={setConfirmaSenha}
            placeholder="Confirme a nova senha"
            secure
          />

          {erroSenha && <Text style={styles.error}>{erroSenha}</Text>}

          <TouchableOpacity
            onPress={validarESalvar}
            style={[styles.button, { backgroundColor: theme.button }]}
          >
            <Text style={[styles.buttonText, { color: theme.buttonText }]}>
              Salvar Alterações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sair}
            style={[styles.button, { backgroundColor: "#E53935" }]}
          >
            <Text style={[styles.buttonText, { color: "#FFF" }]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  title: { fontSize: 32 },
  content: {
    paddingTop: 10,
  },

  label: { marginBottom: 5, fontWeight: "600" },

  // 🔥 HORIZONTAL
  linha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  labelHorizontal: {
    fontSize: 20,
    fontWeight: "bold",
    width: 90, // alinhamento bonito
  },

  valorHorizontal: {
    fontSize: 20,
  },

  input: {
    borderRadius: 15,
    padding: 10,
    marginBottom: 25,
  },

  button: {
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    marginVertical: 30,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
});

const stylesLight = {
  background: "#FFFFFF",
  text: "#000000",
  inputBackground: "#EEE",
  button: "#000000",
  buttonText: "#FFFFFF",
  primary: "#6200ee",
};
