import React from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputAnimado } from "../../../../src/components/InputAnimado";
import type { PerfilTheme } from "../../../../app/global/perfil";

type Props = {
  visible: boolean;
  senha: string;
  confirmarSenha: string;
  onChangeSenha: (value: string) => void;
  onChangeConfirmarSenha: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  theme: PerfilTheme;
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
  focusAnimSenha: Animated.Value;
  focusAnimConfirmarSenha: Animated.Value;
  errorAnim: Animated.Value;
  animateFocus: (value: Animated.Value, toValue: number) => void;
  loading: boolean;
};

export function PasswordModal({
  visible,
  senha,
  confirmarSenha,
  onChangeSenha,
  onChangeConfirmarSenha,
  onClose,
  onSave,
  theme,
  erro,
  mensagens,
  focusAnimSenha,
  focusAnimConfirmarSenha,
  errorAnim,
  animateFocus,
  loading,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>Alterar senha</Text>

          <InputAnimado
            label={
              <View style={styles.labelErro}>
                <Text style={[styles.label, { color: theme.text }]}>Nova senha</Text>
                {erro.senha && <Text style={styles.msgErro}>{mensagens.senha}</Text>}
              </View>
            }
            placeholder="***************"
            value={senha}
            onChangeText={onChangeSenha}
            iconName="lock-closed-outline"
            focusAnim={focusAnimSenha}
            errorAnim={errorAnim}
            temErro={erro.senha}
            secureTextEntry
            animateFocus={animateFocus}
          />

          <InputAnimado
            label={
              <View style={styles.labelErro}>
                <Text style={[styles.label, { color: theme.text }]}>Confirmar senha</Text>
                {erro.confirmarSenha && (
                  <Text style={styles.msgErro}>{mensagens.confirmarSenha}</Text>
                )}
              </View>
            }
            placeholder="***************"
            value={confirmarSenha}
            onChangeText={onChangeConfirmarSenha}
            iconName="shield-checkmark-outline"
            focusAnim={focusAnimConfirmarSenha}
            errorAnim={errorAnim}
            temErro={erro.confirmarSenha}
            secureTextEntry
            animateFocus={animateFocus}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#888888" }]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: theme.primary, opacity: loading ? 0.7 : 1 },
              ]}
              onPress={onSave}
              disabled={loading}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
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
});