import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import type { PerfilTheme } from "../../../../../../../../app/global/perfil";

type Props = {
  theme: PerfilTheme;
  feedback: string;
  setFeedback: (value: string) => void;
  feedbackErro: string;
  onEnviarFeedback: () => void;
  loading: boolean;
};

export function FeedbackCard({
  theme,
  feedback,
  setFeedback,
  feedbackErro,
  onEnviarFeedback,
  loading,
}: Props) {
  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.title, { color: theme.text }]}>Feedback</Text>

      <TextInput
        multiline
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Nos conte o que você está achando do BrincaLibras!"
        placeholderTextColor={theme.inputPlaceholder}
        style={[
          styles.input,
          {
            color: "#000000",
            backgroundColor: theme.solidFieldBg,
            borderColor: theme.solidFieldBorder,
          },
        ]}
        textAlignVertical="top"
      />

      {!!feedbackErro && <Text style={styles.msgErro}>{feedbackErro}</Text>}

      <TouchableOpacity
        style={[styles.sendButton, { backgroundColor: theme.primary, opacity: loading ? 0.7 : 1 }]}
        onPress={onEnviarFeedback}
        disabled={loading}
        activeOpacity={0.85}
      >
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
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

  input: {
    minHeight: 140,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontWeight: "600",
  },

  msgErro: {
    color: "red",
    fontSize: 12,
    marginTop: 8,
  },

  sendButton: {
    marginTop: 12,
    alignSelf: "flex-end",
    minWidth: 110,
    minHeight: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});