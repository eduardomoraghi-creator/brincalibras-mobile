import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputAnimado } from "../../../../src/components/InputAnimado";
import type { PerfilTheme } from "../../../../app/global/perfil";

type Props = {
  theme: PerfilTheme;
  nome: string;
  setNome: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  erro: {
    nome: boolean;
    email: boolean;
    senha: boolean;
    confirmarSenha: boolean;
  };
  mensagens: {
    nome?: string;
    email?: string;
    senha?: string;
    confirmarSenha?: string;
  };
  erroGeral: string;
  focusAnimNome: Animated.Value;
  focusAnimEmail: Animated.Value;
  errorAnim: Animated.Value;
  animateFocus: (value: Animated.Value, toValue: number) => void;
  onSalvarPerfil: () => void;
  onAlterarSenha: () => void;
  loading: boolean;
};

export function ProfileFormCard({
  theme,
  nome,
  setNome,
  email,
  setEmail,
  erro,
  mensagens,
  erroGeral,
  focusAnimNome,
  focusAnimEmail,
  errorAnim,
  animateFocus,
  onSalvarPerfil,
  onAlterarSenha,
  loading,
}: Props) {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Dados cadastrais</Text>
      <Text style={[styles.subtitle, { color: theme.muted }]}>
        Edite seu nome e e-mail diretamente nesta tela.
      </Text>

      <InputAnimado
        label={
          <View style={styles.labelErro}>
            <Text style={[styles.label, { color: theme.text }]}>Nome</Text>
            {erro.nome && <Text style={styles.msgErro}>{mensagens.nome}</Text>}
          </View>
        }
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
        iconName="person-outline"
        focusAnim={focusAnimNome}
        errorAnim={errorAnim}
        temErro={erro.nome}
        animateFocus={animateFocus}
      />

      <InputAnimado
        label={
          <View style={styles.labelErro}>
            <Text style={[styles.label, { color: theme.text }]}>E-mail</Text>
            {erro.email && <Text style={styles.msgErro}>{mensagens.email}</Text>}
          </View>
        }
        placeholder="email@email.com"
        value={email}
        onChangeText={setEmail}
        iconName="mail-outline"
        focusAnim={focusAnimEmail}
        errorAnim={errorAnim}
        temErro={erro.email}
        animateFocus={animateFocus}
      />

      {!!erroGeral && <Text style={styles.msgErroGeral}>{erroGeral}</Text>}

      <View style={styles.buttonsColumn}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: theme.primary, opacity: loading ? 0.7 : 1 }]}
          onPress={onSalvarPerfil}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.saveButtonText}>Salvar dados</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.passwordButton, { backgroundColor: theme.darkButton }]}
          onPress={onAlterarSenha}
          activeOpacity={0.85}
        >
          <Text style={styles.passwordButtonText}>Alterar senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1.2,
    padding: 18,
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  labelErro: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  msgErro: {
    color: "red",
    fontSize: 12,
    marginLeft: 10,
  },

  msgErroGeral: {
    color: "red",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 6,
  },

  buttonsColumn: {
    gap: 10,
    marginTop: 8,
  },

  saveButton: {
    minHeight: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  passwordButton: {
    minHeight: 42,
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
});