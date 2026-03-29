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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePerfil } from "../../hooks/usePerfil";

export default function PerfilScreen() {
  const router = useRouter();
  const { usuario, nome, setNome, email, setEmail, loading, erro, salvar } =
    usePerfil();

  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const theme = stylesLight;

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome ?? "");
      setEmail(usuario.email ?? "");
    }
  }, [usuario]);

  const validarESalvar = async () => {
    setErroSenha("");

    if (senha) {
      if (senha.length < 6) {
        setErroSenha("Senha deve ter no mínimo 6 caracteres");
        return;
      }
      if (senha !== confirmaSenha) {
        setErroSenha("Senhas não coincidem");
        return;
      }
    }

    await salvar(senha || undefined);
    setSenha("");
    setConfirmaSenha("");
  };

  // Função de logout
  const sair = async () => {
    try {
      await AsyncStorage.clear(); // limpa os dados do usuário
      router.replace("/login"); // volta para a tela de login
    } catch (e) {
      console.log("Erro ao sair:", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      {loading && !usuario ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {/* Botão voltar posicionado à esquerda */}
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ position: "absolute", left: 0 }}
            ></TouchableOpacity>

            {/* Título centralizado */}
            <Text
              style={[styles.title, { color: theme.text, textAlign: "center" }]}
            >
              Meu Perfil
            </Text>
          </View>
          {erro ? (
            <Text style={{ color: "red", marginVertical: 10 }}>{erro}</Text>
          ) : null}

          <View style={styles.content}>
            <Text style={[styles.label, { color: theme.text }]}>Nome</Text>
            <TextInput
              value={nome ?? ""}
              onChangeText={setNome}
              style={[
                styles.input,
                { backgroundColor: theme.inputBackground, color: theme.text },
              ]}
            />

            <Text style={[styles.label, { color: theme.text }]}>E-mail</Text>
            <TextInput
              value={email ?? ""}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[
                styles.input,
                { backgroundColor: theme.inputBackground, color: theme.text },
              ]}
            />

            <Text style={[styles.label, { color: theme.text }]}>
              Nova Senha
            </Text>
            <TextInput
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite a nova senha"
              secureTextEntry
              placeholderTextColor="#888"
              style={[
                styles.input,
                { backgroundColor: theme.inputBackground, color: theme.text },
              ]}
            />

            <Text style={[styles.label, { color: theme.text }]}>
              Confirmar Senha
            </Text>
            <TextInput
              value={confirmaSenha}
              onChangeText={setConfirmaSenha}
              placeholder="Confirme a nova senha"
              secureTextEntry
              placeholderTextColor="#888"
              style={[
                styles.input,
                { backgroundColor: theme.inputBackground, color: theme.text },
              ]}
            />

            {erroSenha ? (
              <Text style={{ color: "red", marginBottom: 10 }}>
                {erroSenha}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={validarESalvar}
              style={[styles.button, { backgroundColor: theme.button }]}
            >
              <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                Salvar Alterações
              </Text>
            </TouchableOpacity>

            {/* Botão Sair */}
            <TouchableOpacity
              onPress={sair}
              style={[styles.button, { backgroundColor: "#E53935" }]}
            >
              <Text style={[styles.buttonText, { color: "#FFF" }]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

/* Estilos */
const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 30 },
  content: { paddingTop: 20 },
  label: { marginBottom: 5, fontWeight: "600" },
  input: { borderRadius: 15, padding: 14, marginBottom: 15 },
  button: {
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
});

const stylesLight = {
  background: "#FFFFFF",
  header: "#3A8FB7",
  text: "#000000",
  inputBackground: "#EEE",
  button: "#000000",
  buttonText: "#FFFFFF",
  primary: "#6200ee",
};
